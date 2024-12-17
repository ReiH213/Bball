import { nbaTeams } from "@/constants";
import { Player } from "@/sanity/types";
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

export const calculateTotalPoints = (player: Player): number => {
  // Check if matchDays is nullish (undefined or null), and return 0
  if (!player.matchDays) return 0;

  let matchDays: any[] = [];

  // Normalize matchDays to an array
  if (Array.isArray(player.matchDays)) {
    matchDays = player.matchDays;
  } else if (typeof player.matchDays === "object") {
    matchDays = [player.matchDays]; // Wrap single object into an array
  } else {
    return 0; // If matchDays is in an unexpected format
  }

  let totalPoints = 0;

  // Iterate through the normalized matchDays array
  matchDays.forEach((matchDay) => {
    const fieldGoals = matchDay?.fieldGoals;

    if (fieldGoals) {
      totalPoints +=
        fieldGoals.points_3?.reduce(
          (sum: number, shot: { value?: number }) => sum + (shot.value || 0),
          0
        ) || 0;

      totalPoints +=
        fieldGoals.points_2?.reduce(
          (sum: number, shot: { value?: number }) => sum + (shot.value || 0),
          0
        ) || 0;

      totalPoints +=
        fieldGoals.points_1?.reduce(
          (sum: number, shot: { value?: number }) => sum + (shot.value || 0),
          0
        ) || 0;
    }
  });

  return totalPoints;
};
// Function to calculate total steals
export const calculateTotalSteals = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalSteals = 0;

  matchDays.forEach((matchDay) => {
    totalSteals += matchDay?.steals?.length || 0;
  });

  return totalSteals;
};

// Function to calculate total blocks
export const calculateTotalBlocks = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalBlocks = 0;

  matchDays.forEach((matchDay) => {
    totalBlocks += matchDay?.blocks?.length || 0;
  });

  return totalBlocks;
};

// Function to calculate total assists
export const calculateTotalAssists = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalAssists = 0;

  matchDays.forEach((matchDay) => {
    totalAssists += matchDay?.assists?.length || 0;
  });

  return totalAssists;
};

// Function to calculate total fouls
export const calculateTotalFouls = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalFouls = 0;

  matchDays.forEach((matchDay) => {
    totalFouls += matchDay?.fouls?.length || 0;
  });

  return totalFouls;
};

// Function to calculate total defensive rebounds (dRebounds)
export const calculateTotalDRebounds = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalDRebounds = 0;

  matchDays.forEach((matchDay) => {
    totalDRebounds += matchDay?.dRebounds?.length || 0;
  });

  return totalDRebounds;
};

// Function to calculate total offensive rebounds (oRebounds)
export const calculateTotalORebounds = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalORebounds = 0;

  matchDays.forEach((matchDay) => {
    totalORebounds += matchDay?.oRebounds?.length || 0;
  });

  return totalORebounds;
};

// Function to calculate total missed shots
export const calculateTotalMissedShots = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalMissedShots = 0;

  matchDays.forEach((matchDay) => {
    totalMissedShots += matchDay?.missedShots?.length || 0;
  });

  return totalMissedShots;
};

export const calculateFieldGoalPercentage = (player: Player): number => {
  if (!player.matchDays) return 0;

  const matchDays = Array.isArray(player.matchDays)
    ? player.matchDays
    : [player.matchDays];

  let totalFieldGoalsMade = 0;
  let totalMissedShots = 0;

  matchDays.forEach((matchDay) => {
    const fieldGoals = matchDay?.fieldGoals;

    if (fieldGoals) {
      // Count made shots from points_1, points_2, points_3
      totalFieldGoalsMade +=
        fieldGoals.points_1?.filter((shot) => shot.dot?.made).length || 0;
      totalFieldGoalsMade +=
        fieldGoals.points_2?.filter((shot) => shot.dot?.made).length || 0;
      totalFieldGoalsMade +=
        fieldGoals.points_3?.filter((shot) => shot.dot?.made).length || 0;
    }

    // Count total missed shots
    totalMissedShots += matchDay?.missedShots?.length || 0;
  });

  const totalAttempts = totalFieldGoalsMade + totalMissedShots;

  if (totalAttempts === 0) return 0; // Avoid division by zero

  // Calculate percentage
  const fieldGoalPercentage = (totalFieldGoalsMade / totalAttempts) * 100;

  return parseFloat(fieldGoalPercentage.toFixed(2)); // Round to 2 decimal places
};
