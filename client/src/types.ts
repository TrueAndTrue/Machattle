export interface IChallenge {
  id?: number;
  tie: boolean;
  winnerUsername: string;
  loserUsername: string;
  questionId: number;
  updatedAt: Date;
}

export interface IQuestion {
  id: number;
  question: string;
  timeComplexity: string;
  tests: string[];
  difficulty: string;
  timeElapsed: string;
}

export interface ILeaderBoardUser {
  username: string;
  rating: number;
  image: string;
}

export interface IUser extends ILeaderBoardUser{
  rank :string;
  friends :IUser[]
}
