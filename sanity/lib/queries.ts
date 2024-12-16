import { defineQuery } from "next-sanity";
import { client } from "./client";
import { writeClient } from "./write-client";
import { Player } from "../types";
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

export const createMissingPlayers = async (playerNames: string[]) => {
  console.log("These are the player names", playerNames);

  const query = `*[_type == "player" && name in $names] {
        name,_id
      }`;
  const existingPlayers = await client.fetch(query, { names: playerNames });
  console.log("These are exisitng players: ", existingPlayers);

  // Convert existing player names into a Set for efficient lookup
  const existingPlayerNames = new Set(
    existingPlayers.map((player: Player) => player.name)
  );
  const playersToCreate = playerNames.filter(
    (name) => !existingPlayerNames.has(name)
  );
  console.log("to be created: ");
  console.log(playersToCreate);

  if (playersToCreate.length === 0) return existingPlayers; // If all players exist, return early

  // Create only the missing players
  const newPlayers = playersToCreate.map((name) => ({
    _type: "player",
    name,
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
  const query = `*[_type == "match" && firstTeam == $firstTeam && secondTeam == $secondTeam && date == $matchDate] {
      _id
    }`;

  const existingMatch = await client.fetch(query, {
    firstTeam,
    secondTeam,
    matchDate,
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
  console.log("Created new match:", createdMatch);
  return createdMatch;
};

export const deleteAllPlayers = async () => {
  try {
    // Fetch all player document IDs
    const playerDocs = await client.fetch(`*[_type == "player"]{_id}`);
    const matchDocs = await client.fetch(`*[_type == "match"]{_id}`);

    const matchPromises = matchDocs.map((doc: any) => {
      writeClient.delete(doc._id);
    });
    // Delete each player document
    const deletePromises = playerDocs.map((doc: any) => {
      console.log(doc);

      writeClient.delete(doc._id);
    });
    await Promise.all(deletePromises);

    console.log("All player documents have been deleted.");
  } catch (error) {
    console.error("Error deleting player documents:", error);
  }
};
