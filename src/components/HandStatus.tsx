import React from 'react';
import { Trophy } from 'lucide-react';

interface HandStatusProps {
  name: string;
  description: string;
}

export function HandStatus({ name, description }: HandStatusProps) {
  return (
    <div className="bg-green-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">Current Hand</h3>
      </div>
      <div>
        <div className="text-xl font-bold text-yellow-400">{name}</div>
        <div className="text-gray-300 text-sm mt-1">{description}</div>
      </div>
    </div>
  );
}