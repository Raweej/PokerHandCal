import React from 'react';

interface PlayerSelectorProps {
  players: number;
  setPlayers: (players: number) => void;
}

export function PlayerSelector({ players, setPlayers }: PlayerSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2">Number of Players</label>
      <input
        type="number"
        min="2"
        max="10"
        value={players}
        onChange={(e) => setPlayers(Number(e.target.value))}
        className="bg-green-700 text-white rounded px-3 py-2 w-24"
      />
    </div>
  );
}