export interface IQuestion{
  id: number;
  question :string;
  tests : string[];
  difficulty :string;
}

export interface IUser{
  id: number;
  rank :string;
  rating : number;
  username : string;
  friends : IUser[];
  image : string;
  completedChallanges : IQuestion[];
}