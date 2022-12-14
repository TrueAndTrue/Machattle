export interface IChallenge {
  id?: number;
  tie: boolean;
  winnerUsername: string;
  loserUsername: string;
  questionId: number;
  updatedAt?: Date;
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
  rank: string[];
}

export interface IUser extends ILeaderBoardUser{
  uid:string;
  friends :IUser[];
  challenges : IChallenge[]
}

export interface IRoom {
  uid: string;
  roomId: string;

}

export interface IMessage {
  id ?:number;
  title : string;
  content : string;
  read?:boolean
  senderUsername : string;
  receiverUsername : string;
  createdAt? : Date
}