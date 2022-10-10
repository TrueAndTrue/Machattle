import { IQuestion } from '../types'

interface Qaction{
  type : string;
  payload :IQuestion;
}

const currentQuestion = (currentQuestion = {
    difficulty: '',
    question: '',
    tests: [],
    id :-1,
    timeComplexity : 'O(1)',
    timeElapsed :'0',
    attempts : 0
  },
  action : Qaction
) => {
  switch (action.type) {
    case 'UPDATE':
      return {currentQuestion, ...action.payload}
    default:
      return currentQuestion;
  }
};
