export interface IChallenge{
  id?: number; 
  tie :boolean;
  winnerId : string
  loserId: string
  questionId :number
}

export interface IQuestion{
  id: number;
  question :string;
  timeComplexity : string;
  tests : string[];
  difficulty :string;
  timeElapsed :string;
}