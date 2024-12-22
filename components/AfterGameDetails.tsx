"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  calculateFieldGoalPercentage,
  calculateTotalAssists,
  calculateTotalBlocks,
  calculateTotalDRebounds,
  calculateTotalFouls,
  calculateTotalMissedShots,
  calculateTotalORebounds,
  calculateTotalPoints,
  calculateTotalSteals,
} from "@/lib/utils";
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
  const [playerDetails, setPlayerDetails] = useState<Player | null>(null);

  const handlePlayerClick = (player: Player) => {
    // Extract the first matchDays since we assume one matchDays is returned
    const playerMatchDay = player.matchDays || {};
    const extractedDots = extractDotsFromPlayerStats(playerMatchDay);
    setDots(extractedDots);
    setselectedPlayerName(player);
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

    // Add dots from all player.matchDays
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

  const handlePlayerDetails = (player: Player) => {
    setPlayerDetails(player);
  };
  const renderPlayerStats = (player: Player) => {
    if (!player || !player.matchDays) return null;

    const totalPoints = calculateTotalPoints(player);
    const totalAssists = calculateTotalAssists(player);
    const totaloRebounds = calculateTotalORebounds(player);
    const totaldRebounds = calculateTotalDRebounds(player);
    const totalSteals = calculateTotalSteals(player);
    const totalBlocks = calculateTotalBlocks(player);
    const totalFouls = calculateTotalFouls(player);
    const totalMissedShots = calculateTotalMissedShots(player);
    const fgPercentage = calculateFieldGoalPercentage(player);
    return (
      <Table className="w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Total Points</TableHead>
            <TableHead className="text-right">Offensive Rebounds</TableHead>
            <TableHead className="text-right">Defensive Rebounds</TableHead>
            <TableHead className="text-right">Total Rebounds</TableHead>
            <TableHead className="text-right">Steals</TableHead>
            <TableHead className="text-right">Assists</TableHead>
            <TableHead className="text-right">Blocks</TableHead>
            <TableHead className="text-right">Fouls</TableHead>
            <TableHead className="text-right">Missed Shots</TableHead>
            <TableHead className="text-right">Field Goal Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{totalPoints}</TableCell>
            <TableCell className="text-right">{totaloRebounds}</TableCell>
            <TableCell className="text-right">{totaldRebounds}</TableCell>
            <TableCell className="text-right">
              {totaldRebounds + totaloRebounds}
            </TableCell>
            <TableCell className="text-right">{totalSteals}</TableCell>
            <TableCell className="text-right">{totalAssists}</TableCell>
            <TableCell className="text-right">{totalBlocks}</TableCell>
            <TableCell className="text-right">{totalFouls}</TableCell>
            <TableCell className="text-right">{totalMissedShots}</TableCell>
            <TableCell className="text-right">{fgPercentage} %</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };
  return (
    <div className="mt-5 flex flex-row justify-between mx-2 w-full">
      <div className="flex flex-col gap-y-4 text-white">
        {firstTeamPlayers.map((player: Player) => (
          <div
            key={player._id}
            className="flex flex-row gap-x-3 justify-between"
          >
            <h1
              className={
                selectedPlayerName !== player
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
              onClick={() => handlePlayerClick(player)}
            >
              {player.name}
            </h1>

            <Dialog>
              <DialogTrigger
                className="rounded-lg flex justify-end p-2 bg-[#8b5039] hover:bg-[#dd815c] ease-in-out transition-all delay-100"
                onClick={() => handlePlayerDetails(player)}
              >
                Show Details
              </DialogTrigger>
              <DialogContent
                className="w-full max-w-[1200px]"
                style={{
                  width: "90vw", // Ensures the dialog uses 90% of the viewport width
                  maxWidth: "1200px", // Prevents it from becoming too large
                }}
              >
                <DialogHeader>
                  <DialogTitle>{playerDetails?.name}'s Stats</DialogTitle>
                </DialogHeader>
                {renderPlayerStats(playerDetails!)}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Image
          src={"/court.jpg"}
          alt="court"
          layout="intrinsic"
          width={800}
          height={600}
          style={{ cursor: "default" }}
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
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className={`${dot.made === true ? "bg-green-600" : dot.from === "missedShots" ? "bg-red-500" : dot.from === "oRebounds" ? "bg-[#7e27cf]" : dot.from === "dRebounds" ? "bg-blue-500" : dot.from === "steals" ? "bg-orange-500" : dot.from === "blocks" ? "bg-back-0" : dot.from === "fouls" ? "bg-yellow-500" : dot.from === "assists" ? "bg-pink-400" : "bg-white"}`}
            />
          ))}
      </div>
      <div className="flex flex-col gap-y-4 text-white">
        {secondTeamPlayers.map((player: Player) => (
          <div
            key={player._id}
            className="flex flex-row gap-x-3 justify-between"
          >
            <h1
              className={
                selectedPlayerName !== player
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
              onClick={() => handlePlayerClick(player)}
            >
              {player.name}
            </h1>
            <Dialog>
              <DialogTrigger
                className="rounded-lg flex justify-end p-2 bg-[#8b5039] hover:bg-[#dd815c] ease-in-out transition-all delay-100"
                onClick={() => handlePlayerDetails(player)}
              >
                Show Details
              </DialogTrigger>
              <DialogContent
                className="w-full max-w-[1200px]"
                style={{
                  width: "90vw", // Ensures the dialog uses 90% of the viewport width
                  maxWidth: "1200px", // Prevents it from becoming too large
                }}
              >
                <DialogHeader>
                  <DialogTitle>{playerDetails?.name}'s Stats</DialogTitle>
                </DialogHeader>
                {renderPlayerStats(playerDetails!)}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AfterGameDetails;
