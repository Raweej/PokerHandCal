import React from 'react';
import { Card as CardType } from '../types/poker';
import { Heart, Spade, Diamond, Club } from 'lucide-react';

interface CardProps {
  card: CardType | null;
  onClick: () => void;
  onRemove?: () => void;
}

export function Card({ card, onClick, onRemove }: CardProps) {
  if (!card) {
    return (
      <button
        onClick={onClick}
        className="w-16 h-24 bg-green-700 rounded flex items-center justify-center hover:bg-green-600 transition-colors"
      >
        +
      </button>
    );
  }

  const SuitIcon = {
    hearts: Heart,
    spades: Spade,
    diamonds: Diamond,
    clubs: Club,
  }[card.suit.toLowerCase()];

  const color = ['hearts', 'diamonds'].includes(card.suit.toLowerCase())
    ? 'text-red-500 fill-red-500'
    : 'text-black fill-black';

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className="w-16 h-24 bg-white text-black rounded flex flex-col items-center justify-between p-2 hover:bg-gray-100 transition-colors"
      >
        <span className="text-lg font-semibold">{card.rank}</span>
        <SuitIcon className={`w-6 h-6 ${color}`} />
        <span className="text-lg font-semibold">{card.rank}</span>
      </button>
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
        >
          ×
        </button>
      )}
    </div>
  );
}