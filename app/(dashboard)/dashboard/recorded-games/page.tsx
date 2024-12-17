import { fetchMatchesFromSanity } from "@/sanity/lib/queries";
import { Match } from "@/sanity/types";
import Link from "next/link";
import React from "react";

const MatchesPage = async () => {
  const matches = await fetchMatchesFromSanity();

  return (
    <div className="flex flex-col items-center justify-start py-10 text-white min-h-screen w-full">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-100 border-2 rounded-lg p-3">
        Previous Matches
      </h1>
      <div className="flex flex-wrap gap-6 px-4 w-full">
        {matches.map((match: Match) => (
          <div
            key={match._id}
            className="bg-[#633d2b] text-white shadow-lg rounded-lg overflow-hidden transform transition-transform  hover:bg-[#9b6347] hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-2">
                {match.firstTeam} <span className="text-red-500">vs</span>{" "}
                {match.secondTeam}
              </h2>
              <p className="text-gray-200 text-sm mb-4">
                Date:{" "}
                <span className="font-semibold">
                  {match.date?.split("T")[0]}
                </span>
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-100 text-sm">
                  <p>
                    <span className="font-bold">{match.firstTeam}:</span>{" "}
                    {match.score?.firstTeamScore || 0}
                  </p>
                  <p>
                    <span className="font-bold">{match.secondTeam}:</span>{" "}
                    {match.score?.secondTeamScore || 0}
                  </p>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  Winner: {match.winner || "TBD"}
                </div>
              </div>
              <Link
                href={`/dashboard/recorded-games/${match._id}`}
                className="rounded-md p-2 bottom-0 bg-[#492e21] text-white hover:bg-[#9b6347] hover:text-white hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 font-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
