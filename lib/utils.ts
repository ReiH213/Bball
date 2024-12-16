import { nbaTeams } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getTeamByName(name: string): team {
  const foundTeam = nbaTeams.filter((team) => team.name === name);
  return foundTeam[0];
}

export const generateKey = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;
