import { defineQuery } from "next-sanity";
import { client } from "./client";
import { writeClient } from "./write-client";
import { Player } from "../types";
export const fetchMatchStatsFromSanity = async (): Promise<any[]> => {
  // Fetch matches and stats from Sanity
  const query = `*[_type == "match"] {
    _id,
    firstTeam,
    secondTeam,
    score,
    "opponentStats": *[_type == "player" && references(^._id)] {
      matchDays[match._ref == ^._id] {
        fieldGoals,
        oRebounds,
        turnovers,
        freeThrows
      }
    }
  }`;
  return await client.fetch(query);
};
export const fetchPlayersFromSanity = async (playerNames: string[]) => {
  const query = `*[_type == "player" && name in $names] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      matchDays
    }`;

  const params = { names: playerNames };
  return await client.fetch(query, params);
};

// export const fetchPlayersFromQuery = async (
//   query?: string
// ): Promise<Player[]> => {
//   const searchFilter = query ? `&& name match "*${query}*"` : ""; // Add search filter if a query is provided

//   const players = await client.fetch(`
//     *[_type == "player" ${searchFilter}] {
//       _id,
//       name,
//       matchDays,
//       // Include other fields as needed
//     }
//   `);

//   return players;
// };

export const fetchAllPlayersFromSanity = async (
  query?: string
): Promise<Player[]> => {
  const searchFilter = query ? `&& name match "*${query}*"` : ""; // Add search filter if a query is provided

  const players = await client.fetch(`
      *[_type == "player" ${searchFilter}] {
        _id,
        name,
        matchDays,
        // Include other fields as needed
      }
    `);

  return players;
};

export const fetchPlayerFromSanity = async (playerName: string) => {
  const query = `*[_type == "player" && name == $names] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      matchDays
    }`;

  const params = { names: playerName };
  return await client.fetch(query, params);
};

export const fetchMatchFromSanity = async (matchId: string) => {
  const query = `*[_type == "match" && _id==$matchId]{
  _id,date,firstTeam,secondTeam,score,winner
}`;

  return await client.fetch(query, { matchId });
};

export const fetchMatchFromSanityByRef = async (matchRef: string) => {
  const query = `*[_type == "match" && _ref==matchRef]{
  _id,date,firstTeam,secondTeam,score,winner
}`;

  const result = await client.fetch(query, { matchRef });

  const foundMatch = result.filter((match: any) => match._id === matchRef);

  return foundMatch;
};

export const fetchMatchesFromSanity = async () => {
  const query = `*[_type == "match"]{
  _id,date,firstTeam,secondTeam,score,winner
}`;

  return await client.fetch(query);
};

export const createMissingPlayers = async (playerNames: string[]) => {
  const query = `*[_type == "player" && name in $names] {
        name,_id,matchDays
      }`;
  const existingPlayers = await client.fetch(query, { names: playerNames });
  console.log("existing players: ", existingPlayers);

  const existingPlayerNames = new Set(
    existingPlayers.map((player: Player) => player.name)
  );
  const playersToCreate = playerNames.filter(
    (name) => !existingPlayerNames.has(name)
  );
  console.log("players to create", playersToCreate);

  if (playersToCreate.length === 0) return existingPlayers;

  const newPlayers = playersToCreate.map((name) => ({
    _type: "player",
    name,
    matchDays: [],
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  }));

  const createdPlayers = await Promise.all(
    newPlayers.map((player) => writeClient.create(player))
  );

  return [...existingPlayers, ...createdPlayers];
};

export const createMatchIfNotExists = async (
  firstTeam: string,
  secondTeam: string,
  matchDate: string
) => {
  // Query to check if the match already exists
  const matchDateOnly = matchDate.split("T")[0];
  const query = `*[_type == "match" && firstTeam == $firstTeam && secondTeam == $secondTeam ] {
  _id,date
    }`;
  const existingMatch = await client.fetch(query, {
    firstTeam,
    secondTeam,
    matchDateOnly,
  });

  if (existingMatch.length > 0) {
    console.log("Match already exists:", existingMatch[0]._id);
    return existingMatch[0]; // Return the existing match
  }

  // If match doesn't exist, create a new one
  const newMatch = {
    _type: "match",
    firstTeam,
    secondTeam,
    date: matchDate,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  };

  const createdMatch = await writeClient.create(newMatch);
  return createdMatch;
};

export const deleteAllPlayers = async () => {
  try {
    // Fetch all player document IDs
    const playerDocs = await client.fetch(`*[_type == "player"]{_id}`);
    const matchDocs = await client.fetch(`*[_type == "match"]{_id}`);
    const deletePromises = playerDocs.map((doc: any) => {
      writeClient.delete(doc._id);
    });
    await Promise.all(deletePromises);
    const matchPromises = matchDocs.map((doc: any) => {
      writeClient.delete(doc._id);
    });
    // Delete each player document

    console.log("All player documents have been deleted.");
  } catch (error) {
    console.error("Error deleting player documents:", error);
  }
};

export const fetchPlayersMatchDay = async (
  playerNames: string[],
  matchId: string
) => {
  const query = `*[_type == "player" && name in $playerNames] {
    _id,
    name,
    "matchDays": matchDays[match._ref == $matchId][0]
  }`;

  const result = await client.fetch(query, { playerNames, matchId });

  return result;
};
