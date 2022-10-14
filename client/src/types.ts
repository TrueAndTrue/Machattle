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
  functionName :string;
  parameters :string[]
}

export interface ILeaderBoardUser {
  username: string;
  rating: number;
  image: string;
}

export interface IUser extends ILeaderBoardUser{
  uid:string;
  rank :string;
  friends :IUser[];
  challenges : IChallenge[]
}
