import PlayerCard from "@/components/PlayerCard";
import PlayersSearchField from "@/components/PlayersSearchField";
import { fetchAllPlayersFromSanity } from "@/sanity/lib/queries";
import { Player } from "@/sanity/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query || ""; // Get the search query from URL

  const players: Player[] = await fetchAllPlayersFromSanity(query); // Pass the query to fetch players

  return (
    <div className="flex flex-col w-full gap-y-4">
      <PlayersSearchField query={query} />
      <div className="flex flex-wrap   gap-x-4 gap-y-4 p-2 place-items-start">
        {players.map((player: Player) => (
          <PlayerCard key={player._id} player={player} name={player.name} />
        ))}
      </div>
    </div>
  );
};

export default page;
