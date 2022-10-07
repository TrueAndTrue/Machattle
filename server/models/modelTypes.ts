export interface IQuestion{
  id: number;
  question :string;
  tests : string[];
  difficulty :string;
}

export interface IQueue{
  uid: string;
  roomId: string;
}