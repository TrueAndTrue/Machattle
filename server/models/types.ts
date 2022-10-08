export interface IQuestion{
  id: number;
  question :string;
  tests : string[];
  difficulty :string;
  ownerId?: number;
}

export interface IUser{
  id: number;
  uid : string
  rank :string;
  rating : number;
  username : string;
  image : string;
}

export interface IChallenge{
  id:number; 
}