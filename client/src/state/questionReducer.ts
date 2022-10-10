import { IQuestion } from '../types'
import { UPDATE_QUESTION, UPDATE_CURRENTANSWER, UPDATE_SUBMITTEDANSWER } from './actions/question';

interface Qaction{
  type : string;
  question :IQuestion;
  currentAnswer: string;
  submittedAnswer : string
}

const initialQuestion = {
  difficulty: '',
  question: '',
  currentAnswer: '',
  submittedAnswer: '',
  finalAnswer: '',
  tests: [],
  attempts: 0,
}

export const currentQuestion = (state = initialQuestion, action : Qaction) => {
  switch (action.type) {
    case UPDATE_QUESTION:
      return {state, ...action.question};
    case UPDATE_CURRENTANSWER:
      return {...currentQuestion, currentAnswer: action.currentAnswer};
    case UPDATE_SUBMITTEDANSWER:
      return {...currentQuestion, submittedAnswer: action.submittedAnswer};
    default:
      return state;
  }
};
