import React from 'react';

interface WinRateProps {
  winRate: number;
}

export function WinRate({ winRate }: WinRateProps) {
  return (
    <div className="bg-green-800 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Win Rate</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-600">
              Chance to Win
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-white">
              {winRate.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-700">
          <div
            style={{ width: `${winRate}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}