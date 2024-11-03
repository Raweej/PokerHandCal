import React from 'react';
import { Spade } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Spade className="w-8 h-8" />
      <h1 className="text-3xl font-bold">Poker Probability Calculator</h1>
    </div>
  );
}