import { Player } from "@/sanity/types";
import React, { useState } from "react";
import PlayerCard from "./PlayerCard";

const PlayerCards = ({ players }: { players: Player[] }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-6">
        {players.map((player: Player) => (
          <PlayerCard key={player._id} player={player} name={player.name} />
        ))}
      </div>
    </div>
  );
};

export default PlayerCards;
