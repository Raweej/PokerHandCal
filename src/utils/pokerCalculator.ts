import { Card } from '../types/poker';

export function calculateProbabilities(
  hand: Card[],
  river: Card[],
  players: number
): { hand: string; probability: number }[] {
  // Calculate remaining cards and player-based multiplier
  const remainingCards = 52 - hand.length - river.length;
  const multiplier = Math.max(0.1, 1 - (players - 1) * 0.2);
  
  // Base probabilities for premium hands only
  const baseProbabilities = [
    { hand: 'Royal Flush', probability: 0.000154 },
    { hand: 'Straight Flush', probability: 0.00139 },
    { hand: 'Four of a Kind', probability: 0.0240 },
    { hand: 'Full House', probability: 0.1441 },
    { hand: 'Flush', probability: 0.1965 },
    { hand: 'Straight', probability: 0.3925 },
    { hand: 'Three of a Kind', probability: 2.1128 },
  ];

  // Adjust probabilities based on remaining cards and current hand/river
  return baseProbabilities.map(prob => {
    let adjustedProbability = prob.probability * multiplier;

    // Adjust based on remaining cards
    adjustedProbability *= (remainingCards / 47);

    // Increase probability if we have matching suits for flush-based hands
    if (prob.hand.includes('Flush')) {
      const suits = [...hand, ...river].map(card => card.suit);
      const suitCounts = suits.reduce((acc, suit) => {
        acc[suit] = (acc[suit] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const maxSuitCount = Math.max(...Object.values(suitCounts), 0);
      if (maxSuitCount >= 3) {
        adjustedProbability *= (1 + (maxSuitCount - 2) * 0.5);
      }
    }

    // Adjust for pairs/trips in hand
    const ranks = [...hand, ...river].map(card => card.rank);
    const rankCounts = ranks.reduce((acc, rank) => {
      acc[rank] = (acc[rank] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const maxRankCount = Math.max(...Object.values(rankCounts), 0);
    if (maxRankCount >= 2) {
      if (prob.hand === 'Four of a Kind' || prob.hand === 'Full House' || prob.hand === 'Three of a Kind') {
        adjustedProbability *= (1 + (maxRankCount - 1) * 0.75);
      }
    }

    return {
      hand: prob.hand,
      probability: Math.min(100, adjustedProbability)
    };
  });
}

export function calculateWinRate(
  hand: Card[],
  river: Card[],
  players: number
): number {
  if (hand.length === 0) return 0;
  
  // Basic win rate calculation based on hand strength and number of players
  const handStrength = calculateHandStrength(hand);
  const riverStrength = calculateRiverStrength(river);
  const baseWinRate = 100 / players;
  
  return Math.min(100, Math.max(0, 
    baseWinRate * handStrength * riverStrength * (1 + (5 - river.length) * 0.1)
  ));
}

function calculateHandStrength(hand: Card[]): number {
  if (hand.length === 0) return 0;
  
  // Pair in hand
  if (hand.length === 2 && hand[0].rank === hand[1].rank) {
    return 2.5;
  }
  
  // High cards (A, K, Q)
  const highCards = hand.filter(card => ['A', 'K', 'Q'].includes(card.rank));
  if (highCards.length > 0) {
    return 1.5 + (highCards.length * 0.3);
  }
  
  // Suited cards
  if (hand.length === 2 && hand[0].suit === hand[1].suit) {
    return 1.3;
  }
  
  return 1.0;
}

function calculateRiverStrength(river: Card[]): number {
  if (river.length === 0) return 1.0;
  
  // More cards on the river means more certainty
  const certaintyFactor = 1 + (river.length * 0.1);
  
  return certaintyFactor;
}