
import { ForeignKey } from 'sequelize'

export interface IQuestion{
  id: number;
  question :string;
  timeComplexity : string;
  tests : string[][];
  difficulty :string;
  timeElapsed :string;
  functionName : string
  functionParameters : string[]
}


export interface IQueue{
  uid:string;
  roomId: string; 
}

export interface IUser{
  id: number;
  uid : string
  rank :string;
  rating : number;
  username : string;
  image : string;

  friends? :IUser[];
  Questions?: IQuestion[];
  Challenges? : IChallenge[];
}

export interface IQueue {
  uid: string;
  roomId: string;
}

export interface IChallenge{
  id: number; 
  tie :boolean;
  winnerId : ForeignKey<string>;
  loserId: ForeignKey<string>;
  questionId :ForeignKey<number>;
}
