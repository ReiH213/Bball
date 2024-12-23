import { nbaTeams } from "@/constants";
import { Match, Player } from "@/sanity/types";
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

export const calculatePlayerStatsPerGame = (player: Player): playerPerGame => {
  const { matchDays } = player;

  if (!matchDays || matchDays.length === 0) {
    return {
      name: player.name as string,
      pointsPerGame: 0,
      assistsPerGame: 0,
      reboundsPerGame: 0,
      blocksPerGame: 0,
      stealsPerGame: 0,
    };
  }

  // Aggregate stats
  let totalPoints = 0;
  let totalAssists = 0;
  let totalRebounds = 0;
  let totalBlocks = 0;
  let totalSteals = 0;

  matchDays.forEach((matchDay) => {
    // Calculate points for this match
    const pointsFromFieldGoals = [
      ...(matchDay.fieldGoals?.points_1 || []),
      ...(matchDay.fieldGoals?.points_2 || []),
      ...(matchDay.fieldGoals?.points_3 || []),
    ].reduce((sum, goal) => sum + (goal.value || 0), 0);

    totalPoints += pointsFromFieldGoals;
    totalAssists += matchDay.assists?.length || 0;
    totalRebounds +=
      (matchDay.oRebounds?.length || 0) + (matchDay.dRebounds?.length || 0);
    totalBlocks += matchDay.blocks?.length || 0;
    totalSteals += matchDay.steals?.length || 0;
  });

  // Calculate per-game averages
  const gamesPlayed = matchDays.length;

  return {
    name: player.name as string,
    pointsPerGame: totalPoints / gamesPlayed,
    assistsPerGame: totalAssists / gamesPlayed,
    reboundsPerGame: totalRebounds / gamesPlayed,
    blocksPerGame: totalBlocks / gamesPlayed,
    stealsPerGame: totalSteals / gamesPlayed,
  };
};

export const calculateTeamWins = async (matches: Match[]) => {
  // Initialize a wins counter for each team
  const teamWins: { [team: string]: number } = {};

  // Count wins for each match
  matches.forEach((match: Match) => {
    if (match.winner && match.winner !== "Draw") {
      if (!teamWins[match.winner]) {
        teamWins[match.winner] = 0;
      }
      teamWins[match.winner]++;
    }
  });
  const sortedTeams = Object.entries(teamWins)
    .map(([team, wins]) => ({ team, wins }))
    .sort((a, b) => b.wins - a.wins);

  // Get the top 10 teams
  const top10Teams = sortedTeams.slice(0, 10);

  return top10Teams;
};

interface DefMatch extends Match {
  opponentStats: Player[];
}
export const calculateDefensiveRating = (matches: DefMatch[]): teamDef[] => {
  const teamStats: {
    [team: string]: { pointsAllowed: number; possessions: number };
  } = {};

  matches.forEach((match: any) => {
    // Add stats for firstTeam
    if (!teamStats[match.firstTeam as string]) {
      teamStats[match.firstTeam as string] = {
        pointsAllowed: 0,
        possessions: 0,
      };
    }
    teamStats[match.firstTeam as string].pointsAllowed += match.score
      ?.secondTeamScore as number;

    const firstTeamOpponentStats = match.opponentStats.filter(
      (stat: any) => stat.team === match.secondTeam
    );
    firstTeamOpponentStats.forEach((stat: any) => {
      const possessions =
        stat.fieldGoals?.attempts +
        0.44 * stat.freeThrows?.attempts -
        stat.oRebounds?.count +
        stat.turnovers?.count;
      teamStats[match.firstTeam].possessions += possessions || 0;
    });

    // Add stats for secondTeam
    if (!teamStats[match.secondTeam]) {
      teamStats[match.secondTeam] = { pointsAllowed: 0, possessions: 0 };
    }
    if (match.score?.firstTeamScore) {
      teamStats[match.secondTeam].pointsAllowed += match.score.firstTeamScore;
    }

    const secondTeamOpponentStats = match.opponentStats.filter(
      (stat: any) => stat.team === match.firstTeam
    );
    secondTeamOpponentStats.forEach((stat: any) => {
      const possessions =
        stat.fieldGoals?.attempts +
        0.44 * stat.freeThrows?.attempts -
        stat.oRebounds?.count +
        stat.turnovers?.count;
      teamStats[match.secondTeam].possessions += possessions || 0;
    });
  });

  // Calculate defensive ratings
  const defensiveRatings = Object.entries(teamStats).map(([team, stats]) => {
    const defensiveRating =
      stats.possessions > 0
        ? (stats.pointsAllowed / stats.possessions) * 100
        : 0;
    return { team, defensiveRating };
  });

  // Sort by defensive rating (ascending)
  const sortedTeams = defensiveRatings.sort(
    (a, b) => a.defensiveRating - b.defensiveRating
  );

  // Get top 10 teams
  const top10Teams = sortedTeams.slice(0, 10);
  return top10Teams;
};

export const calculateTeamPerformanceFromMatches = (matches: Match[]) => {
  const teamStats: {
    [team: string]: { wins: number; games: number; performance: number[] };
  } = {};

  matches.forEach((match: Match) => {
    const { firstTeam, secondTeam, score } = match;

    // Initialize stats for each team if not already present
    if (!firstTeam || typeof firstTeam !== "string") {
      console.error("Invalid firstTeam:", firstTeam);
      return; // Skip this match
    }
    if (!secondTeam || typeof secondTeam !== "string") {
      console.error("Invalid secondTeam:", secondTeam);
      return; // Skip this match
    }

    teamStats[firstTeam] = { wins: 0, games: 0, performance: [] };

    teamStats[secondTeam] = { wins: 0, games: 0, performance: [] };

    // Determine the winner and update stats
    const firstTeamScore = score?.firstTeamScore;
    const secondTeamScore = score?.secondTeamScore;

    if (firstTeamScore && secondTeamScore && firstTeamScore > secondTeamScore) {
      teamStats[firstTeam].wins += 1;
      teamStats[firstTeam].performance.push(1); // Win = 1
      teamStats[secondTeam].performance.push(0); // Loss = 0
    } else if (
      firstTeamScore &&
      secondTeamScore &&
      secondTeamScore > firstTeamScore
    ) {
      teamStats[secondTeam].wins += 1;
      teamStats[secondTeam].performance.push(1);
      teamStats[firstTeam].performance.push(0);
    } else {
      // Draw case
      teamStats[firstTeam].performance.push(0.5); // Draw = 0.5
      teamStats[secondTeam].performance.push(0.5);
    }
    // Increment games played for both teams
    teamStats[firstTeam].games += 1;
    teamStats[secondTeam].games += 1;
  });

  return teamStats;
};

export const getTopTeamsByPerformance = (teamStats: {
  [team: string]: { wins: number; games: number; performance: number[] };
}) => {
  const teams = Object.entries(teamStats).map(([name, stats]) => ({
    name,
    wins: stats.wins,
    games: stats.games,
    performance: stats.performance, // Array of performance over games
  }));

  // Sort by wins (descending) and take the top 5
  const topTeams = teams.sort((a, b) => b.wins - a.wins).slice(0, 5);

  return topTeams;
};

export const formatLineChartData = (teams: TeamPerformance[]) => {
  return {
    labels: teams[0]?.performance.map((_, index) => `Game ${index + 1}`),
    datasets: teams.map((team) => ({
      label: team.name,
      data: team.performance,
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1,
    })),
  };
};

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const calculateDefensivePerformance = (players: Player[]) => {
  return players.map((player) => {
    const totalBlocks = player.matchDays
      ?.flatMap((day) => day.blocks || [])
      .reduce((sum, block) => sum + (block.value || 0), 0);

    const totalSteals = player.matchDays
      ?.flatMap((day) => day.steals || [])
      .reduce((sum, steal) => sum + (steal.value || 0), 0);

    const totalDefRebounds = player.matchDays
      ?.flatMap((day) => day.dRebounds || [])
      .reduce((sum, rebound) => sum + (rebound.value || 0), 0);

    const gamesPlayed = player.matchDays?.length || 1;

    let blocksPerGame = 0;
    let stealsPerGame = 0;
    let defReboundsPerGame = 0;
    // Calculate per-game stats
    if (totalBlocks) {
      blocksPerGame = totalBlocks / gamesPlayed;
    }
    if (totalSteals) {
      stealsPerGame = totalSteals / gamesPlayed;
    }
    if (totalDefRebounds) {
      defReboundsPerGame = totalDefRebounds / gamesPlayed;
    }

    // Defensive Score (you can customize this formula)
    const defensiveScore =
      blocksPerGame * 1.5 + stealsPerGame * 2 + defReboundsPerGame * 1;

    return {
      name: player.name,
      defensiveScore,
      blocksPerGame,
      stealsPerGame,
      defReboundsPerGame,
    };
  });
};

export const getTopDefensivePlayers = (players: Player[]) => {
  const defensivePerformance = calculateDefensivePerformance(players);

  return defensivePerformance
    .sort((a, b) => b.defensiveScore - a.defensiveScore) // Sort by defensive score
    .slice(0, 10); // Get the top 10 players
};
