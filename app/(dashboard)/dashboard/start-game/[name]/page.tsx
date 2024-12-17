import StatKeepingComponent from "@/components/StatKeepingComponent";
import { assists } from "@/constants";
import { generateKey, getTeamByName } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  createMatchIfNotExists,
  createMissingPlayers,
  fetchPlayersFromSanity,
} from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Match, Player } from "@/sanity/types";
import Timer from "@/components/Timer";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ name?: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const firstTeam = decodeURIComponent((await params).name as string);
  const secondTeam = (await searchParams).secondTeam;
  const matchDate = new Date().toISOString(); // Example date (adjust as needed)
  if (!firstTeam || !secondTeam) return;

  const initializeTeamStats = async (
    teamName: string,
    matchDate: string,
    matchId: string
  ): Promise<Player[]> => {
    const team = getTeamByName(teamName); // Local function to get the team by name
    const playerNames = team.startingFive;

    // Fetch or create players in the database
    const existingPlayers = await createMissingPlayers(playerNames);

    // Add a matchDay entry for each player
    const updatedPlayers = await Promise.all(
      existingPlayers.map(async (player: Player) => {
        // Check if the player already has a matchDay for this date
        const hasMatchDay = player.matchDays?.some(
          (day) => day.date === matchDate
        );

        if (!hasMatchDay) {
          const updatedPlayer: Player = await writeClient
            .patch(player._id) // Update the player's document
            .setIfMissing({ matchDays: [] }) // Ensure `matchDays` exists
            .insert("after", "matchDays[-1]", [
              {
                _key: generateKey(),
                date: matchDate,
                match: { _type: "reference", _ref: matchId },
                fieldGoals: {
                  points_2: [],
                  points_3: [],
                  points_1: [],
                },
                fouls: [],
                oRebounds: [],
                dRebounds: [],
                steals: [],
                blocks: [],
                missedShots: [],
                assists: [],
              },
            ]) // Add a new matchDay entry
            .commit(); // Commit the update

          return updatedPlayer;
        }

        return player; // If the matchDay already exists, return the player as-is
      })
    );

    return updatedPlayers; // Return the updated players
  };

  const match: Match = await createMatchIfNotExists(
    firstTeam,
    secondTeam,
    matchDate
  );
  const firstTeamStats = await initializeTeamStats(
    firstTeam,
    matchDate,
    match._id
  );
  const secondTeamStats = await initializeTeamStats(
    secondTeam,
    matchDate,
    match._id
  );

  return (
    <div className="flex flex-col w-full items-center mt-4 ml-1 overflow-y-hidden bg-inherit ">
      <h1 className="flex items-center gap-8 ml-2 text-4xl font-extrabold text-white">
        {firstTeam} <span className="text-4xl font-bold">VS</span> {secondTeam}
      </h1>
      <Timer />
      <StatKeepingComponent
        firstTeam={firstTeam}
        secondTeam={secondTeam as string}
        firstTeamStats={firstTeamStats}
        secondTeamStats={secondTeamStats}
        match={match}
      />
    </div>
  );
}
