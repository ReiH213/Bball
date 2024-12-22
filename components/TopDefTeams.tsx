"use client";
import { teamImgs } from "@/constants";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const TopDefTeams = ({ teams }: { teams: teamDef[] }) => {
  return (
    <motion.div
      initial={{
        y: -300,
        opacity: 0,
      }}
      animate={{
        transition: { delay: 2.2, duration: 1.5 },
        y: 0,
        opacity: 1,
      }}
      whileHover={{
        scale: 1.2,
        y: 50,
        transition: { duration: 0.2 },
        background: "rgba(0, 0, 0, 0.50)",
      }}
      className="flex flex-col w-fit h-fit rounded-xl p-3 items-center justify-center text-white gap-y-5"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
    >
      <h1 className="text-xl font-semibold">Top Teams (Defense Rating)</h1>
      <ul className="flex flex-col text-white gap-y-4">
        {teams.map((team: teamDef) => (
          <li
            key={team.team}
            className="flex flex-row gap-x-1 items-center border-b-2 py-2"
          >
            <Image
              alt="teamImg"
              src={teamImgs.find((t) => t.name === team.team)?.img as string}
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <h1 className="font-extrabold text-xl">{team.team}</h1>
              <span className="font-bold flex flex-row gap-x-2">
                {team.defensiveRating}{" "}
                <span className="font-extrabold text-green-600">DFR</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TopDefTeams;
