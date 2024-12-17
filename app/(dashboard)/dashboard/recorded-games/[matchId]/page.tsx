import AfterGameDetails from "@/components/AfterGameDetails";
import { getTeamByName } from "@/lib/utils";
import {
  fetchMatchFromSanity,
  fetchPlayersMatchDay,
} from "@/sanity/lib/queries";
import React from "react";
const Page = async ({ params }: { params: Promise<{ matchId?: string }> }) => {
  const matchId = (await params).matchId as string;
  const match = await fetchMatchFromSanity(matchId);
  if (!match || !match[0]) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Match not found.</p>
      </section>
    );
  }
  const firstTeamPlayers = getTeamByName(match[0].firstTeam).startingFive;
  const secondTeamPlayers = getTeamByName(match[0].secondTeam).startingFive;
  const [firstTeamMatchDays, secondTeamMatchDays] = await Promise.all([
    fetchPlayersMatchDay(firstTeamPlayers, matchId),
    fetchPlayersMatchDay(secondTeamPlayers, matchId),
  ]);

  return (
    <section className="flex flex-col items-center justify-start text-white  w-full h-full py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        Match Details
      </h1>
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <h2 className="text-xl font-bold text-gray-100 text-left">
            {match[0].firstTeam}
          </h2>
          <span className="text-gray-500 text-sm font-semibold">VS</span>
          <h2 className="text-xl font-bold text-gray-100 text-right">
            {match[0].secondTeam}
          </h2>
        </div>
        <p className="text-gray-600 text-sm text-center mt-4">
          Date:{" "}
          <span className="font-semibold">
            {new Date(match[0].date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            {match[0].firstTeam}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {match[0].score?.firstTeamScore || 0}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            {match[0].secondTeam}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {match[0].score?.secondTeamScore || 0}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center bg-white rounded-lg p-2">
        <h3 className="text-lg font-bold text-green-600">
          Winner: {match[0].winner}
        </h3>
      </div>
      <div className="flex flex-wrap w-full items-center justify-center gap-x-6 mt-5">
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-green-500" />
          <h1>Field Goals</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-red-500" />
          <h1>Missed Shot</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-[#7e27cf]" />
          <h1>Offensive Rebound</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-blue-500" />
          <h1>Deffensive Rebound</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-pink-500" />
          <h1>Assist</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-orange-500" />
          <h1>Steal</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-black-0" />
          <h1>Block</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="rounded-full p-2 h-4 w-4 bg-yellow-500" />
          <h1>Foul</h1>
        </div>
      </div>

      <AfterGameDetails
        firstTeam={match[0].firstTeam}
        secondTeam={match[0].secondTeam}
        firstTeamPlayers={firstTeamMatchDays}
        secondTeamPlayers={secondTeamMatchDays}
      />
    </section>
  );
};
export default Page;
