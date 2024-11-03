import React from 'react';
import { Card as CardType } from '../types/poker';
import { Card } from './Card';

interface HandDisplayProps {
  title: string;
  cards: (CardType | null)[];
  onCardClick: (index: number) => void;
}

export function HandDisplay({ title, cards, onCardClick }: HandDisplayProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2">{title}</label>
      <div className="flex gap-4 flex-wrap">
        {cards.map((card, i) => (
          <Card
            key={i}
            card={card}
            onClick={() => onCardClick(i)}
          />
        ))}
      </div>
    </div>
  );
}