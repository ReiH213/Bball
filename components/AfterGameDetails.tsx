"use client";
import { getTeamByName } from "@/lib/utils";
import { Player } from "@/sanity/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
declare type ExtendedDot = {
  x: number;
  y: number;
  made?: boolean; // Optional since some dots might not include "made"
  from: string; // Source of the dot, e.g., 'points_2', 'steals', etc.
};
const AfterGameDetails = ({
  firstTeam,
  secondTeam,
  firstTeamPlayers,
  secondTeamPlayers,
}: {
  firstTeam: string;
  secondTeam: string;
  firstTeamPlayers: Player[];
  secondTeamPlayers: Player[];
}) => {
  const [dots, setDots] = useState<ExtendedDot[]>([]);
  const [selectedPlayerName, setselectedPlayerName] = useState<Player | null>(
    null
  );
  const handlePlayerClick = (player: Player) => {
    // Extract the first matchDays since we assume one matchDays is returned
    const playerMatchDay = player.matchDays || {};
    const extractedDots = extractDotsFromPlayerStats(playerMatchDay);
    setDots(extractedDots);
    setselectedPlayerName(player);
    console.log("Extracted Dots:", extractedDots);
  };
  const extractDotsFromPlayerStats = (matchDays: any): ExtendedDot[] => {
    const dots: ExtendedDot[] = [];
    const addDots = (statName: string, statArray: any[]) => {
      if (statArray && statArray.length > 0) {
        statArray.forEach((item) => {
          if (item.dot) {
            dots.push({
              x: item.dot.x || 0,
              y: item.dot.y || 0,
              made: item.dot.made ?? false,
              from: statName,
            });
          }
        });
      }
    };

    // Add dots from all stats
    addDots("points_2", matchDays.fieldGoals?.points_2 || []);
    addDots("points_3", matchDays.fieldGoals?.points_3 || []);
    addDots("points_1", matchDays.fieldGoals?.points_1 || []);
    addDots("fouls", matchDays.fouls || []);
    addDots("oRebounds", matchDays.oRebounds || []);
    addDots("dRebounds", matchDays.dRebounds || []);
    addDots("steals", matchDays.steals || []);
    addDots("assists", matchDays.assists || []);
    addDots("blocks", matchDays.blocks || []);
    addDots("missedShots", matchDays.missedShots || []);

    return dots;
  };
  useEffect(() => {
    console.log(firstTeamPlayers);
    console.log(secondTeamPlayers);
  }, [firstTeam, secondTeam]);
  return (
    <div className="mt-5 flex flex-row justify-between mx-2 w-full">
      <div className="flex flex-col gap-y-4 text-white">
        {firstTeamPlayers.map((player: Player) => (
          <h1
            key={player._id}
            className={
              selectedPlayerName !== player
                ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
            }
            onClick={() => handlePlayerClick(player)}
          >
            {player.name}
          </h1>
        ))}
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Image
          src={"/court.jpg"}
          alt="court"
          layout="intrinsic"
          width={800}
          height={600}
          style={{ cursor: "pointer" }}
          className=""
        />
        {dots.length > 0 &&
          dots.map((dot: ExtendedDot) => (
            <div
              key={dot.x + dot.y}
              style={{
                position: "absolute",
                top: dot.y,
                left: dot.x,
                width: "10px",
                height: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className={``}
            />
          ))}
      </div>
      <div className="flex flex-col gap-y-4 text-white">
        {secondTeamPlayers.map((player: Player) => (
          <h1
            key={player._id}
            className={
              selectedPlayerName !== player
                ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
            }
            onClick={() => handlePlayerClick(player)}
          >
            {player.name}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default AfterGameDetails;
