import { ForeignKey } from "sequelize";

export interface IQuestion {
  id: number;
  question: string;
  timeComplexity: string;
  tests: string[][];
  difficulty: string;
  timeElapsed: string;
  functionName: string;
  parameters: string[];
}

export interface IQueue {
  uid: string;
  roomId: string;
  rank: string[];
}

export interface IUser {
  id: number;
  uid: string;
  rank: string[];
  rating: number;
  username: string;
  image: string;

  friends?: IUser[];
  Questions?: IQuestion[];
  Challenges?: IChallenge[];
}

export interface IQueue {
  uid: string;
  roomId: string;
}

export interface IChallenge {
  id: number;
  tie: boolean;
  winnerUsername: ForeignKey<string>;
  loserUsername: ForeignKey<string>;
  questionId: ForeignKey<number>;
}

export interface IMessage {
  id :number;
  title? : string;
  content : string;
  read:boolean
  senderUsername : ForeignKey<string>;
  receiverUsername : ForeignKey<string>;
}