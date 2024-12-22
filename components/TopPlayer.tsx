"use client";
import { playerIMgs } from "@/constants";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const TopPlayer = ({ players }: { players: playerPerGame[] }) => {
  return (
    <motion.div
      initial={{
        x: 300,
        opacity: 0,
      }}
      animate={{
        transition: { delay: 2, duration: 1.5 },
        x: 0,
        opacity: 1,
      }}
      whileHover={{
        scale: 1.2,
        y: 80,
        transition: { duration: 0.2 },
        background: "rgba(0, 0, 0, 0.50)",
      }}
      className="flex flex-col w-fit rounded-xl p-3 items-center justify-start text-white gap-y-5"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
    >
      <h1 className="text-xl font-semibold">Top 10 Players (PPG)</h1>
      <ul className="flex flex-col text-white gap-y-4 ">
        {players.map((player: playerPerGame) => (
          <li
            key={player.name}
            className="flex flex-row gap-x-1 items-center border-b-2 py-2"
          >
            <Image
              alt="playerImg"
              src={
                playerIMgs.find((p) => p.name === player.name)?.img as string
              }
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              {player.name}
              <span className="font-bold flex flex-row gap-x-2">
                {player.pointsPerGame} <h3 className="font-normal">PPG</h3>{" "}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TopPlayer;
