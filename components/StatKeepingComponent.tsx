"use client";
import { assists, blocks, fieldGoals, rebounds, steals } from "@/constants";
import { getTeamByName } from "@/lib/utils";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

const StatKeepingComponent = ({
  firstTeam,
  secondTeam,
}: {
  firstTeam: string;
  secondTeam: string;
}) => {
  const [firstTeamStats, setFirstTeamStats] = useState<PlayerDuringGame[]>([]);
  const [secondTeamStats, setSecondTeamStats] = useState<PlayerDuringGame[]>(
    []
  );

  const [selected, setSelected] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [dot, setDot] = useState<Dot>({ x: 0, y: 0, made: false });
  const [firstTeamScore, setFirstTeamScore] = useState(0);
  const [secondTeamScore, setSecondTeamScore] = useState(0);
  const handleImageClick = (event: any) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const imageWidth = 820; // Assuming you know the image width
    const imageHeight = 380; // Assuming you know the image height

    // Calculate actual click position after rotation (consider image dimensions)
    const actualX = imageHeight - offsetY + imageWidth + 474;
    const actualY = offsetX + 4;

    setDot({ y: actualY, x: actualX, made: false });
  };

  const handleFieldGoal = (made?: boolean) => {
    if (!selected) return;

    // Points to add based on field goal type
    const pointsToAdd =
      selectedAction === "3-Points" ? 3 : selectedAction === "2-Points" ? 2 : 1;

    // Determine the correct team
    const team = firstTeamStats.some((p) => p.name === selected)
      ? "first"
      : "second";

    if (made) {
      // Update the team's score
      if (team === "first") {
        setFirstTeamScore((prevScore) => prevScore + pointsToAdd);
      } else {
        setSecondTeamScore((prevScore) => prevScore + pointsToAdd);
      }

      // Update player's field goal stats
      const fieldGoalKey: keyof PlayerDuringGame["fieldGoals"] =
        pointsToAdd === 3
          ? "points_3"
          : pointsToAdd === 2
            ? "points_2"
            : "points_1";

      updatePlayerStats(team, selected, fieldGoalKey, {
        value: pointsToAdd,
        dot: { ...dot, made: true },
      });
    } else {
      // Track missed shot
      updatePlayerStats(team, selected, "missedShots", { value: 1, dot });
    }
  };

  const handlePlayerAction = (action: string) => {
    if (!selected) return;

    // Determine the stat key and increment based on action

    const statMapping: {
      [key: string]: keyof PlayerDuringGame;
    } = {
      "O-Rebound": "oRebounds",
      "D-Rebound": "dRebounds",
      Steal: "steals",
      Block: "blocks",
      Foul: "fouls",
    };

    const statKey = statMapping[action];
    console.log(statKey);

    if (!statKey) return;

    // Determine the team
    const team = firstTeamStats.some((p) => p.name === selected)
      ? "first"
      : "second";

    // Update stats
    updatePlayerStats(team, selected, statKey, { value: 1, dot });
  };

  const updatePlayerStats = (
    team: "first" | "second",
    playerName: string,
    statKey: keyof PlayerDuringGame | keyof PlayerDuringGame["fieldGoals"],
    data: { value: number; dot: Dot }
  ) => {
    const stats = team === "first" ? firstTeamStats : secondTeamStats;
    const setStats = team === "first" ? setFirstTeamStats : setSecondTeamStats;

    const updatedStats = stats.map((player) => {
      if (player.name !== playerName) return player;

      // Handle field goals, fouls, rebounds, steals, blocks
      if (statKey === "fouls") {
        return {
          ...player,
          fouls: [...player.fouls, { foul: data.value, dot: data.dot }],
        };
      } else if (statKey === "oRebounds" || statKey === "dRebounds") {
        return {
          ...player,
          [statKey]: [
            ...player[statKey],
            { rebound: data.value, dot: data.dot },
          ],
        };
      } else if (statKey === "steals") {
        return {
          ...player,
          steals: [...player.steals, { steal: data.value, dot: data.dot }],
        };
      } else if (statKey === "blocks") {
        return {
          ...player,
          blocks: [...player.blocks, { block: data.value, dot: data.dot }],
        };
      } else if (
        statKey === "points_2" ||
        statKey === "points_3" ||
        statKey === "points_1"
      ) {
        return {
          ...player,
          fieldGoals: {
            ...player.fieldGoals,
            [statKey]: [
              ...player.fieldGoals[
                statKey as keyof PlayerDuringGame["fieldGoals"]
              ],
              { point: data.value, dot: data.dot },
            ],
          },
        };
      } else if (statKey === "missedShots") {
        return {
          ...player,
          missedShots: [
            ...player.missedShots,
            { missed: data.value, dot: data.dot },
          ],
        };
      }

      return player;
    });

    setStats(updatedStats);
    setSelectedAction("");
    setSelected("");
    setDot({ x: 0, y: 0, made: false });
  };

  const hanldeClick = () => {
    console.log(firstTeamStats);
    console.log(secondTeamStats);
  };
  useLayoutEffect(() => {
    const initializeTeamStats = (teamName: string) => {
      const team = getTeamByName(teamName);
      return team.startingFive.map((player) => ({
        name: player,
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
      }));
    };
    setFirstTeamStats(initializeTeamStats(firstTeam));
    setSecondTeamStats(initializeTeamStats(secondTeam));
  }, [firstTeam, secondTeam]);
  return (
    <div className="flex mt-5 flex-col justify-center">
      <h1 className="flex flex-row gap-x-40 font-bold ml-16 text-3xl">
        {firstTeamScore} <span className="font-extrabold">-</span>{" "}
        {secondTeamScore}
      </h1>
      <section className="flex flex-row">
        <div className="flex flex-col gap-y-12 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{firstTeam}</h2>
            <ul className="flex flex-col gap-y-2">
              {getTeamByName(firstTeam).startingFive.map((player) => (
                <li
                  onClick={() => setSelected(player)}
                  className={
                    selected !== player
                      ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                      : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
                  }
                  key={player}
                >
                  {player}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {secondTeam && secondTeam}
            </h2>
            <ul className="flex flex-col gap-y-2">
              {secondTeam &&
                getTeamByName(secondTeam).startingFive.map((player) => (
                  <li
                    onClick={() => setSelected(player)}
                    className={
                      selected !== player
                        ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                        : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
                    }
                    key={player}
                  >
                    {player}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 mt-6 ml-10 ">
          <h2 className="mb-2 text-xl font-semibold">Field Goals</h2>
          <div className="flex flex-wrap gap-6">
            {fieldGoals.map((fieldGoal) => (
              <span
                key={fieldGoal}
                onClick={() => setSelectedAction(fieldGoal)}
                className={
                  selectedAction !== fieldGoal
                    ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                    : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
                }
              >
                {fieldGoal}
              </span>
            ))}
            <span
              onClick={() => handleFieldGoal(true)}
              className="rounded-lg p-2 font-semibold bg-green-700 text-green-400 hover:bg-transparent hover:text-green-600 ease-in-out transition-all delay-150 hover:cursor-pointer"
            >
              Made
            </span>
            <span
              onClick={() => handleFieldGoal(false)}
              className="rounded-lg p-2 font-semibold bg-red-700 text-red-300 hover:bg-transparent hover:text-red-600 ease-in-out transition-all delay-150 hover:cursor-pointer"
            >
              Missed
            </span>
          </div>
          <h2 className="mb-2 text-xl font-semibold">Rebounds</h2>
          <div className="flex flex-wrap gap-6">
            {rebounds.map((rebound) => (
              <span
                key={rebound}
                onClick={() => handlePlayerAction(rebound)}
                className={
                  selectedAction !== rebound
                    ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                    : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
                }
              >
                {rebound}
              </span>
            ))}
          </div>
          <div className="flex mt-4 flex-wrap gap-x-5">
            <div className="flex flex-wrap gap-6">
              {assists.map((assist) => (
                <span
                  key={assist}
                  onClick={() => handlePlayerAction(assist)}
                  className={
                    selectedAction !== assist
                      ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                      : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
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
                      ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                      : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
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
                      ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                      : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
                  }
                >
                  {block}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <span
                onClick={() => handlePlayerAction("foul")}
                className={
                  selectedAction !== "block"
                    ? "bg-black-0 rounded-lg p-2 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-pointer"
                    : "cursor-default bg-transparent text-black-0 rounded-lg p-2 shadow-md shadow-black-0"
                }
              >
                Foul
              </span>
            </div>
          </div>
          <button onClick={hanldeClick} className="text-xl">
            Click
          </button>
        </div>
      </section>
      <section className="mt-64">
        <Image
          src={"/court.jpg"}
          alt="court"
          width={820}
          height={380}
          style={{ transform: "rotate(90deg)" }}
          className="absolute right-0 top-[180px]"
          onClick={handleImageClick}
        />
        {dot && (
          <>
            <div
              style={{
                position: "absolute",
                left: dot.x,
                top: dot.y,
                width: "8px",
                height: "8px",
                backgroundColor: "transparent",
                borderRadius: "50%",
              }}
              className="scale-up-center border-2 border-white"
            ></div>
          </>
        )}
      </section>
    </div>
  );
};

export default StatKeepingComponent;
