import { IQuestion } from '../types'
import {
  UPDATE_QUESTION,
  UPDATE_EDITORPROMPT,
  UPDATE_CURRENTANSWER,
  UPDATE_SUBMITTEDANSWER,
  UPDATE_TESTS,
  UPDATE_ATTEMPTS,
} from './actions/question';

interface Qaction{
  type : string;
  question :IQuestion;
  editorPrompt: string;
  currentAnswer: string;
  submittedAnswer : string;
  tests: [];
  attempts: number;
}

const initialQuestion = {
  difficulty: '',
  question: '',
  editorPrompt: '',
  currentAnswer: '',
  submittedAnswer: '',
  finalAnswer: '',
  tests: [],
  attempts: 0,
}

export const currentQuestion = (state = initialQuestion, action : Qaction) => {
  switch (action.type) {
    case UPDATE_QUESTION:
      return { state, ...action.question };
    case UPDATE_EDITORPROMPT:
      return { state, editorPrompt: action.editorPrompt };
    case UPDATE_CURRENTANSWER:
      return { ...state, currentAnswer: action.currentAnswer };
    case UPDATE_SUBMITTEDANSWER:
      return { ...state, submittedAnswer: action.submittedAnswer };
    case UPDATE_TESTS:
      return { state, tests: action.tests };
    case UPDATE_ATTEMPTS:
      return { state, attempts: action.attempts };
    default:
      return state;
  }
};
