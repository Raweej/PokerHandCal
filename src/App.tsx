import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Card } from './components/Card';
import { CardSelector } from './components/CardSelector';
import { ProbabilityTable } from './components/ProbabilityTable';
import { WinRate } from './components/WinRate';
import { HandStatus } from './components/HandStatus';
import { calculateProbabilities, calculateWinRate } from './utils/pokerCalculator';
import { evaluateHand } from './utils/handEvaluator';
import type { Card as CardType } from './types/poker';

function App() {
  const [players, setPlayers] = useState(2);
  const [handCards, setHandCards] = useState<(CardType | null)[]>([null, null]);
  const [riverCards, setRiverCards] = useState<(CardType | null)[]>([null, null, null, null, null]);
  const [selectingCard, setSelectingCard] = useState<{ type: 'hand' | 'river'; index: number } | null>(null);

  const getAllCards = useCallback(() => {
    return [...handCards, ...riverCards].filter((card): card is CardType => card !== null);
  }, [handCards, riverCards]);

  const handleCardSelect = (rank: string, suit: string) => {
    if (!selectingCard) return;

    const newCard = { rank, suit };
    
    if (selectingCard.type === 'hand') {
      const newHand = [...handCards];
      newHand[selectingCard.index] = newCard;
      setHandCards(newHand);
    } else {
      const newRiver = [...riverCards];
      newRiver[selectingCard.index] = newCard;
      setRiverCards(newRiver);
    }
    
    setSelectingCard(null);
  };

  const handleRemoveCard = (type: 'hand' | 'river', index: number) => {
    if (type === 'hand') {
      const newHand = [...handCards];
      newHand[index] = null;
      setHandCards(newHand);
    } else {
      const newRiver = [...riverCards];
      newRiver[index] = null;
      setRiverCards(newRiver);
    }
  };

  const validHandCards = handCards.filter((card): card is CardType => card !== null);
  const validRiverCards = riverCards.filter((card): card is CardType => card !== null);
  
  const probabilities = calculateProbabilities(validHandCards, validRiverCards, players);
  const winRate = calculateWinRate(validHandCards, validRiverCards, players);
  const currentHand = evaluateHand(validHandCards, validRiverCards);

  return (
    <div className="min-h-screen bg-green-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <div className="mb-8">
          <label className="block mb-2">Number of Players:</label>
          <input
            type="number"
            min="2"
            max="10"
            value={players}
            onChange={(e) => setPlayers(Math.max(2, Math.min(10, parseInt(e.target.value) || 2)))}
            className="bg-green-800 text-white px-4 py-2 rounded w-24"
          />
        </div>

        {validHandCards.length > 0 && (
          <div className="mb-8">
            <WinRate winRate={winRate} />
            <ProbabilityTable probabilities={probabilities} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Hand</h2>
            <div className="flex gap-4 mb-4">
              {handCards.map((card, index) => (
                <Card
                  key={`hand-${index}`}
                  card={card}
                  onClick={() => setSelectingCard({ type: 'hand', index })}
                  onRemove={card ? () => handleRemoveCard('hand', index) : undefined}
                />
              ))}
            </div>
            {validHandCards.length > 0 && (
              <HandStatus name={currentHand.name} description={currentHand.description} />
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">River Cards</h2>
            <div className="flex gap-4">
              {riverCards.map((card, index) => (
                <Card
                  key={`river-${index}`}
                  card={card}
                  onClick={() => setSelectingCard({ type: 'river', index })}
                  onRemove={card ? () => handleRemoveCard('river', index) : undefined}
                />
              ))}
            </div>
          </div>
        </div>

        {selectingCard && (
          <CardSelector
            onSelect={handleCardSelect}
            onClose={() => setSelectingCard(null)}
            usedCards={getAllCards()}
          />
        )}
      </div>
    </div>
  );
}

export default App;