import React from 'react';
import type { HandProbability } from '../types/poker';

interface ProbabilityTableProps {
  probabilities: HandProbability[];
}

export function ProbabilityTable({ probabilities }: ProbabilityTableProps) {
  return (
    <div className="bg-green-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Premium Hand Probabilities</h2>
      <div className="space-y-3">
        {probabilities.map(({ hand, probability }) => (
          <div key={hand} className="flex items-center gap-4">
            <div className="w-32 font-medium">{hand}</div>
            <div className="flex-1">
              <div className="h-2 bg-green-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, probability * 2)}%` }}
                />
              </div>
            </div>
            <div className="w-20 text-right font-mono text-sm">
              {probability.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}