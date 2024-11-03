import React from 'react';
import { HandProbability } from '../types/poker';

interface ProbabilityDisplayProps {
  probabilities: HandProbability[];
}

export function ProbabilityDisplay({ probabilities }: ProbabilityDisplayProps) {
  return (
    <div className="bg-green-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Hand Probabilities</h2>
      <div className="space-y-4">
        {probabilities.map(({ hand, probability }) => (
          <div key={hand} className="flex items-center">
            <div className="w-32 font-medium">{hand}</div>
            <div className="flex-1">
              <div className="h-4 bg-green-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${probability}%` }}
                />
              </div>
            </div>
            <div className="w-20 text-right">{probability.toFixed(2)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}