"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nbaTeams } from "@/constants";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
const SelectTeam = () => {
  const [firstTeam, setFirstTeam] = useState<team | null>(null);
  const [secondTeam, setSecondTeam] = useState<team | null>(null);
  const [selectTeamError, setSelectTeamError] = useState(false);
  const handleSelectTeam = (team: team, teamSelect: number) => {
    if (teamSelect === 1) {
      if (team === secondTeam) {
        setSelectTeamError(true);
        // Reset the error state after 3 seconds
        setTimeout(() => {
          setSelectTeamError(false);
        }, 3000);
        return;
      }
      setFirstTeam(team);
    }
    if (teamSelect === 2) {
      if (team === firstTeam) {
        setSelectTeamError(true);
        // Reset the error state after 3 seconds
        setTimeout(() => {
          setSelectTeamError(false);
        }, 3000);
        return;
      }
      setSecondTeam(team);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row gap-10 justify-center  items-start">
        <div className="flex flex-col gap-y-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col rounded-md p-2 bg-black-0 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 font-semibold">
              {firstTeam === null ? "Select First Team" : firstTeam.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-56 overflow-y-auto">
              <DropdownMenuLabel>Select Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {nbaTeams.map((team) => (
                <DropdownMenuItem
                  onClick={() => handleSelectTeam(team, 1)}
                  key={team.name}
                >
                  {team.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {firstTeam !== null && (
            <div className="flex flex-col rounded-md bg-black-0 text-white p-2  absolute mt-16">
              <h1 className="font-semibold mb-2">
                Coach: {firstTeam.coachName}
              </h1>
              <h1 className="font-semibold">Starting Five</h1>
              <ul className="mt-1">
                {firstTeam.startingFive.map((player: string) => (
                  <li key={player}>{player}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold">VS</h1>
        <div className="flex flex-col gap-y-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md p-2 bg-black-0 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 font-semibold">
              {secondTeam === null ? "Select Second Team" : secondTeam.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-56 overflow-y-auto">
              <DropdownMenuLabel>Select Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {nbaTeams.map((team) => (
                <DropdownMenuItem
                  onClick={() => handleSelectTeam(team, 2)}
                  key={team.name}
                >
                  {team.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {secondTeam !== null && (
            <div className="flex flex-col rounded-md bg-black-0 text-white p-2  absolute mt-16 transition-all ease-in-out delay-300 ">
              <h1 className="font-semibold mb-2">
                Coach: {secondTeam.coachName}
              </h1>
              <h1 className="font-semibold">Starting Five</h1>
              <ul className="mt-1">
                {secondTeam.startingFive.map((player: string) => (
                  <li key={player}>{player}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <h1
          onClick={() => {
            setFirstTeam(null);
            setSecondTeam(null);
          }}
          className="rounded-full w-[30px] h-[30px] flex items-center justify-center mx-2 bg-black-0 text-white hover:bg-red-500  hover:shadow-md hover:shadow-red-400  ease-in-out transition-all delay-150 font-bold hover:cursor-pointer"
        >
          X
        </h1>
        {selectTeamError && (
          <h1 className="text-red-600  font-semibold flex flex-col text-xs max-h-inherit">
            You can't select same team for both teams
            <span>Please select 2 different teams</span>
          </h1>
        )}
        {firstTeam !== null && secondTeam !== null && (
          <div className="rounded-lg p-3 justify-center flex flex-col items-center bg-black-0 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 font-semibold hover:cursor-default min-h-[265px]">
            <h1 className="mb-4">Upcoming Match</h1>
            <h1 className="rounded-md p-2 bottom-0 ">
              Match Day : {formatDate(Date())}
            </h1>
            <h1 className="text-4xl font-bold">
              {firstTeam.name}{" "}
              <span className="text-6xl font-extrabold">VS</span>{" "}
              {secondTeam.name}
            </h1>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-72 w-full max-w-md  text-center gap-y-4">
        <Link
          href={`/dashboard/start-game/${firstTeam?.name}?secondTeam=${secondTeam?.name}`}
          className="rounded-md p-2 bottom-0 bg-black-0 text-white hover:bg-transparent hover:text-black-0 hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 font-semibold"
        >
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default SelectTeam;
