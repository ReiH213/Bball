import PlayerCard from "@/components/PlayerCard";
import { fetchAllPlayersFromSanity } from "@/sanity/lib/queries";
import { Player } from "@/sanity/types";
import React from "react";

const page = async () => {
  const players: Player[] = await fetchAllPlayersFromSanity();
  return (
    <section className="flex flex-wrap   gap-x-4 gap-y-1 p-2 place-items-start">
      {players.map((player: Player) => (
        <PlayerCard key={player._id} player={player} name={player.name} />
      ))}
    </section>
  );
};

export default page;
