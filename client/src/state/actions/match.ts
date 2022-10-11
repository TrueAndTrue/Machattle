export const UPDATE_MATCH = 'UPDATE_MATCH';

interface match {
  player1: string;
  player2: string;
  matchFound: boolean;
  winner: string;
  loser: string;
  roomId: string;
}

export const updateMatch = (matchInfo: match) => ({
  type: UPDATE_MATCH,
  matchInfo,
});
