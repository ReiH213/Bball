"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const HomeHero = () => {
  return (
    <motion.div
      initial={{
        x: -300,
        opacity: 0,
      }}
      animate={{
        transition: { delay: 2, duration: 1.5 },
        x: 0,
        opacity: 1,
      }}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
      className="rounded-lg p-2 flex flex-col text-white w-fit gap-y-4 h-fit"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 4 } }}
        className="font-extrabold italic p-3 text-center text-xl rounded-2xl bg-[#492e21] text-white hover:bg-[#9b6347] hover:text-white hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
      >
        <Link href={"/dashboard/start-game"}>Record Stats during game</Link>
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 4 } }}
        className="font-extrabold italic p-3 text-center text-xl rounded-2xl bg-[#492e21] text-white hover:bg-[#9b6347] hover:text-white hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
      >
        <Link href={"/dashboard/recorded-games"}>
          See previous Recorded games
        </Link>
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 4 } }}
        className="font-extrabold italic p-3 text-center text-xl rounded-2xl bg-[#492e21] text-white hover:bg-[#9b6347] hover:text-white hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
      >
        <Link href={"/dashboard/players-stats"}>
          Get Individual players statistics
        </Link>
      </motion.h1>
    </motion.div>
  );
};

export default HomeHero;
