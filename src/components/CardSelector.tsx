import React from 'react';
import { Heart, Spade, Diamond, Club } from 'lucide-react';

interface CardSelectorProps {
  onSelect: (rank: string, suit: string) => void;
  onClose: () => void;
  usedCards: { rank: string; suit: string }[];
}

export function CardSelector({ onSelect, onClose, usedCards }: CardSelectorProps) {
  const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  const suits = [
    { name: 'Hearts', icon: Heart, color: 'text-red-500 fill-red-500' },
    { name: 'Spades', icon: Spade, color: 'text-black fill-black' },
    { name: 'Diamonds', icon: Diamond, color: 'text-red-500 fill-red-500' },
    { name: 'Clubs', icon: Club, color: 'text-black fill-black' },
  ];

  const isCardUsed = (rank: string, suit: string) => {
    return usedCards.some(card => card.rank === rank && card.suit === suit);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-green-800 p-6 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Select a Card</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {suits.map(({ name, icon: Icon, color }) => (
            <div key={name}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <span>{name}</span>
              </div>
              <div className="space-y-2">
                {ranks.map((rank) => {
                  const used = isCardUsed(rank, name);
                  return (
                    <button
                      key={`${name}-${rank}`}
                      onClick={() => !used && onSelect(rank, name)}
                      className={`w-full py-2 px-4 rounded transition-colors ${
                        used 
                          ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                          : 'bg-green-700 hover:bg-green-600'
                      }`}
                      disabled={used}
                    >
                      {rank}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}