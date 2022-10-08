export interface IQuestion{
  id: number;
  question :string;
  tests : string[];
  difficulty :string;
  ownerId?: number;
}

export interface IUser{
  id: number;
  rank :string;
  rating : number;
  username : string;
  image : string;
}

export interface IQueue{
  uid: string;
  roomId: string;
}

export interface IChallenge{
  id :number;
  question :string;
}