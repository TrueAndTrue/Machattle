import { IQuestion } from '../types'

interface Qaction{
  type : string;
  payload :IQuestion;
}

const initialQuestion = {
  difficulty: '',
  question: '',
  tests: [],
  id :-1,
  timeComplexity : 'O(1)',
  timeElapsed :'0',
  attempts : 0
}

export const currentQuestion = (state = initialQuestion, action : Qaction) => {
  switch (action.type) {
    case "UPDATE_QUESTION":
      return {state, ...action.payload}
    default:
      return state;
  }
};
