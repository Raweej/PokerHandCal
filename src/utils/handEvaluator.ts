import { Card } from '../types/poker';

type HandRank = {
  name: string;
  rank: number;
  description: string;
};

export function evaluateHand(hand: Card[], river: Card[]): HandRank {
  const allCards = [...hand, ...river];
  if (allCards.length === 0) return { name: 'No Cards', rank: 0, description: 'Select your cards' };
  
  const ranks = allCards.map(card => card.rank);
  const suits = allCards.map(card => card.suit);
  
  // Count occurrences of each rank and suit
  const rankCount = ranks.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const suitCount = suits.reduce((acc, suit) => {
    acc[suit] = (acc[suit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Check for pairs
  const pairs = Object.entries(rankCount).filter(([_, count]) => count === 2);
  const threeOfAKind = Object.entries(rankCount).find(([_, count]) => count === 3);
  const fourOfAKind = Object.entries(rankCount).find(([_, count]) => count === 4);
  
  // Check for flush
  const flush = Object.values(suitCount).some(count => count >= 5);
  
  // Check for straight
  const rankValues = ranks.map(rank => {
    if (rank === 'A') return 14;
    if (rank === 'K') return 13;
    if (rank === 'Q') return 12;
    if (rank === 'J') return 11;
    return parseInt(rank);
  }).sort((a, b) => a - b);
  
  const uniqueRanks = [...new Set(rankValues)];
  let straight = false;
  for (let i = 0; i < uniqueRanks.length - 4; i++) {
    if (uniqueRanks[i + 4] - uniqueRanks[i] === 4) {
      straight = true;
      break;
    }
  }
  
  // Evaluate hand
  if (straight && flush) {
    const maxRank = Math.max(...rankValues);
    if (maxRank === 14) {
      return { name: 'Royal Flush', rank: 10, description: 'Ace-high straight flush' };
    }
    return { name: 'Straight Flush', rank: 9, description: `${maxRank}-high straight flush` };
  }
  
  if (fourOfAKind) {
    return { name: 'Four of a Kind', rank: 8, description: `Four ${fourOfAKind[0]}s` };
  }
  
  if (threeOfAKind && pairs.length >= 1) {
    return { name: 'Full House', rank: 7, description: `${threeOfAKind[0]}s full of ${pairs[0][0]}s` };
  }
  
  if (flush) {
    return { name: 'Flush', rank: 6, description: `${Math.max(...rankValues)}-high flush` };
  }
  
  if (straight) {
    return { name: 'Straight', rank: 5, description: `${Math.max(...rankValues)}-high straight` };
  }
  
  if (threeOfAKind) {
    return { name: 'Three of a Kind', rank: 4, description: `Three ${threeOfAKind[0]}s` };
  }
  
  if (pairs.length >= 2) {
    return { name: 'Two Pair', rank: 3, description: `${pairs[0][0]}s and ${pairs[1][0]}s` };
  }
  
  if (pairs.length === 1) {
    return { name: 'One Pair', rank: 2, description: `Pair of ${pairs[0][0]}s` };
  }
  
  const highCard = Math.max(...rankValues);
  const highCardRank = ranks[rankValues.indexOf(highCard)];
  return { name: 'High Card', rank: 1, description: `${highCardRank}-high` };
}