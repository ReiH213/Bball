import HomeHero from "@/components/HomeHero";
import LineChart from "@/components/LineChart";
import RadarChart from "@/components/RadarChart";
import TitleComponent from "@/components/TitleComponent";
import TopDefensivePlayers from "@/components/TopDefPlayers";
import TopDefTeams from "@/components/TopDefTeams";
import TopPlayer from "@/components/TopPlayer";
import TopTeams from "@/components/TopTeams";
import {
  calculateDefensiveRating,
  calculatePlayerStatsPerGame,
  calculateTeamPerformanceFromMatches,
  calculateTeamWins,
  getTopDefensivePlayers,
  getTopTeamsByPerformance,
} from "@/lib/utils";
import {
  fetchAllPlayersFromSanity,
  fetchMatchesFromSanity,
  fetchMatchStatsFromSanity,
} from "@/sanity/lib/queries";
import { Player } from "@/sanity/types";
import React from "react";

const HomePage = async () => {
  const players = await fetchAllPlayersFromSanity();
  const playersPerGame = players.map((player: Player) => {
    return calculatePlayerStatsPerGame(player);
  });
  const sortedPlayers = playersPerGame.sort(
    (a: playerPerGame, b: playerPerGame) => b.pointsPerGame - a.pointsPerGame
  );
  const top10Players = sortedPlayers.slice(0, 10);

  const topDefensivePlayers = getTopDefensivePlayers(players);
  const matches = await fetchMatchesFromSanity();
  const topTeams = await calculateTeamWins(matches);

  const defTeams = await fetchMatchStatsFromSanity();
  const topDefTeams = calculateDefensiveRating(defTeams);

  const teamStats = calculateTeamPerformanceFromMatches(matches);
  const topPerfTeams = getTopTeamsByPerformance(teamStats);

  return (
    <div className="p-4 w-full flex flex-row overflow-hidden gap-y-10 justify-between">
      <div className="flex flex-col gap-y-10">
        <TitleComponent />
        <HomeHero />
        <div className="flex flex-row gap-x-5 items-end">
          <RadarChart players={top10Players} />
          {/* <LineChart teams={topPerfTeams} /> */}
        </div>
      </div>
      <div className="flex flex-row gap-x-3">
        <TopDefTeams teams={topDefTeams} />
        <TopTeams teams={topTeams} />
        <TopDefensivePlayers players={topDefensivePlayers} />
        <TopPlayer players={top10Players} />
      </div>
    </div>
  );
};

export default HomePage;
