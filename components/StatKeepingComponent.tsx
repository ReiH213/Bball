"use client";
import { assists, blocks, fieldGoals, rebounds, steals } from "@/constants";
import { getTeamByName } from "@/lib/utils";
import { Match, Player } from "@/sanity/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadSpinner from "./LoadSpinner";

const StatKeepingComponent = ({
  firstTeam,
  secondTeam,
  firstTeamStats: initialFirstTeamStats,
  secondTeamStats: initialSecondTeamStats,
  match,
}: {
  firstTeam: string;
  secondTeam: string;
  firstTeamStats: Player[];
  secondTeamStats: Player[];
  match: Match;
}) => {
  const [firstTeamStats, setFirstTeamStats] = useState<Player[]>(
    initialFirstTeamStats
  );
  const [secondTeamStats, setSecondTeamStats] = useState<Player[]>(
    initialSecondTeamStats
  );
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [dot, setDot] = useState<{ x: number; y: number; made: boolean }>({
    x: 0,
    y: 0,
    made: false,
  });
  const [firstTeamScore, setFirstTeamScore] = useState(0);
  const [secondTeamScore, setSecondTeamScore] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const handleSubmitGame = async () => {
    setisLoading(true);
    try {
      const response = await fetch("/api/submit-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstTeamStats,
          secondTeamStats,
          firstTeamScore,
          secondTeamScore,
          match,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message);
        setisLoading(false);
        router.push("/dashboard/recorded-games");
      } else {
        console.error(result.message);
        alert("Failed to submit the game. Please try again.");
        setisLoading(false);
      }
    } catch (error) {
      console.error("Error submitting the game:", error);
      alert("Failed to submit the game. Please try again.");
      setisLoading(false);
    }
  };

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDot({ x, y, made: false });
  };

  const handleFieldGoal = (made?: boolean) => {
    if (!selectedPlayerName) return;

    const pointsToAdd =
      selectedAction === "3-Points" ? 3 : selectedAction === "2-Points" ? 2 : 1;

    const teamStats =
      firstTeamStats.find((p) => p.name === selectedPlayerName) !== undefined
        ? "first"
        : "second";

    if (made) {
      if (teamStats === "first") {
        setFirstTeamScore((prev) => prev + pointsToAdd);
      } else {
        setSecondTeamScore((prev) => prev + pointsToAdd);
      }

      const fieldGoalKey =
        pointsToAdd === 3
          ? "points_3"
          : pointsToAdd === 2
            ? "points_2"
            : "points_1";

      updatePlayerStats(
        teamStats,
        selectedPlayerName,
        "fieldGoals",
        {
          value: pointsToAdd,
          dot: { ...dot, made: true },
          _key: generateKey(),
        },
        fieldGoalKey as keyof NonNullable<Player["matchDays"]>[0]["fieldGoals"]
      );
    } else {
      updatePlayerStats(teamStats, selectedPlayerName, "missedShots", {
        value: 1,
        dot,
        _key: generateKey(),
      });
    }
  };

  const handlePlayerAction = (action: string) => {
    if (!selectedPlayerName) return;

    const statMapping: {
      [key: string]: keyof NonNullable<NonNullable<Player["matchDays"]>[0]>;
    } = {
      "O-Rebound": "oRebounds",
      "D-Rebound": "dRebounds",
      Steal: "steals",
      Block: "blocks",
      Foul: "fouls",
      Assist: "assists",
    };

    const statKey = statMapping[action];
    if (!statKey) return;

    const teamStats =
      firstTeamStats.find((p) => p.name === selectedPlayerName) !== undefined
        ? "first"
        : "second";

    updatePlayerStats(teamStats, selectedPlayerName, statKey, {
      value: 1,
      dot,
      _key: generateKey(),
    });
  };

  const updatePlayerStats = (
    team: "first" | "second",
    playerName: string,
    statKey: keyof NonNullable<NonNullable<Player["matchDays"]>[0]>,
    data: {
      value: number;
      dot: { x: number; y: number; made?: boolean };
      _key: string;
    },
    fieldGoalKey?: keyof NonNullable<Player["matchDays"]>[0]["fieldGoals"]
  ) => {
    const stats = team === "first" ? firstTeamStats : secondTeamStats;
    const setStats = team === "first" ? setFirstTeamStats : setSecondTeamStats;

    const updatedStats = stats.map((player) => {
      if (player.name !== playerName) return player;
      const matchDayIndex = player.matchDays?.findIndex(
        (day) => day.match?._ref === match._id
      );
      const matchDay = player.matchDays?.[matchDayIndex || 0];

      if (!matchDay) return player;

      if (statKey === "fieldGoals" && fieldGoalKey) {
        const updatedFieldGoals = {
          ...matchDay.fieldGoals,
          [fieldGoalKey]: [
            ...(matchDay.fieldGoals?.[fieldGoalKey] || []),
            data,
          ],
        };

        return {
          ...player,
          matchDays: [
            {
              ...matchDay,
              fieldGoals: updatedFieldGoals,
            },
          ],
        };
      } else if (Array.isArray(matchDay[statKey])) {
        const updatedStatArray = [
          ...(matchDay[statKey] as Array<any>), // Confirm it's an array
          data,
        ];

        return {
          ...player,
          matchDays: [
            {
              ...matchDay,
              [statKey]: updatedStatArray,
            },
          ],
        };
      }
      return player;
    });

    setStats(updatedStats as Player[]);
    setSelectedAction("");
    setSelectedPlayerName(null);
    setDot({ x: 0, y: 0, made: false });
  };

  const generateKey = () =>
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return (
    <div className="flex items-center w-full mt-5 flex-col justify-center text-white">
      <h1 className="flex flex-row gap-x-40 font-bold ml-16 text-3xl">
        {firstTeamScore} <span className="font-extrabold">-</span>{" "}
        {secondTeamScore}
      </h1>

      <section className="flex flex-wrap mt-10 gap-x-4 max-h-7">
        <div className="flex flex-row gap-4">
          {fieldGoals.map((fieldGoal) => (
            <span
              key={fieldGoal}
              onClick={() => setSelectedAction(fieldGoal)}
              className={
                selectedAction !== fieldGoal
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
            >
              {fieldGoal}
            </span>
          ))}
          <span
            onClick={() => handleFieldGoal(true)}
            className="rounded-lg p-2 font-semibold bg-green-700 text-green-400 hover:bg-green-600 hover:text-white active:text-green-500 active:bg-white ease-in-out transition-all delay-150 hover:cursor-pointer"
          >
            Made
          </span>
          <span
            onClick={() => handleFieldGoal(false)}
            className="rounded-lg p-2 font-semibold bg-red-700 text-red-300 hover:bg-red-600 hover:text-white active:text-red-500 active:bg-white ease-in-out transition-all delay-150 hover:cursor-pointer"
          >
            Missed
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          {rebounds.map((rebound) => (
            <span
              key={rebound}
              onClick={() => handlePlayerAction(rebound)}
              className={
                selectedAction !== rebound
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold text-white active:bg-white active:text-[#694d3f] hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default  text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
            >
              {rebound}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-6">
          {assists.map((assist) => (
            <span
              key={assist}
              onClick={() => handlePlayerAction(assist)}
              className={
                selectedAction !== assist
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
            >
              {assist}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-6">
          {steals.map((steal) => (
            <span
              key={steal}
              onClick={() => handlePlayerAction(steal)}
              className={
                selectedAction !== steal
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
            >
              {steal}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-6">
          {blocks.map((block) => (
            <span
              key={block}
              onClick={() => handlePlayerAction(block)}
              className={
                selectedAction !== block
                  ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                  : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
              }
            >
              {block}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-6">
          <span
            onClick={() => handlePlayerAction("Foul")}
            className={
              selectedAction !== "block"
                ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
            }
          >
            Foul
          </span>
        </div>
      </section>
      <section className=" flex flex-row w-full justify-between mt-10 px-5">
        <div>
          <h2 className="text-2xl font-bold mb-4">{firstTeam}</h2>
          <ul className="flex flex-col gap-y-6">
            {getTeamByName(firstTeam).startingFive.map((player) => (
              <li
                onClick={() => setSelectedPlayerName(player)}
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                }}
                className={
                  selectedPlayerName !== player
                    ? "bg-[#492e21] rounded-lg p-2 font-semibold active:bg-white active:text-[#694d3f] text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                    : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
                }
                key={player}
              >
                {player}
              </li>
            ))}
          </ul>
        </div>
        <section>
          <div
            style={{ position: "relative", display: "inline-block" }}
            onClick={handleImageClick}
          >
            <Image
              src={"/court.jpg"}
              alt="Click to place dot"
              layout="intrinsic"
              width={800}
              height={600}
              style={{ cursor: "pointer" }}
            />
            {dot && (
              <div
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
              ></div>
            )}
          </div>
        </section>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {secondTeam && secondTeam}
          </h2>
          <ul className="flex flex-col gap-y-6">
            {secondTeam &&
              getTeamByName(secondTeam).startingFive.map((player) => (
                <li
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                  }}
                  onClick={() => setSelectedPlayerName(player)}
                  className={
                    selectedPlayerName !== player
                      ? "bg-[#492e21] rounded-lg p-2 font-semibold text-white hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                      : "cursor-default bg-white text-[#694d3f] font-semibold rounded-lg p-2 shadow-md shadow-black-0"
                  }
                  key={player}
                >
                  {player}
                </li>
              ))}
          </ul>
        </div>
      </section>
      {isLoading ? (
        <div className="mt-20">
          <LoadSpinner />
        </div>
      ) : (
        <button
          className="mt-24 w-96 rounded-lg font-bold text-3xl p-4 bg-[#492e21] text-white  hover:bg-[#9b6347]  hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
          onClick={handleSubmitGame}
        >
          Submit Game
        </button>
      )}
    </div>
  );
};

export default StatKeepingComponent;
