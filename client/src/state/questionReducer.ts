import { IQuestion } from '../types'

interface Qaction{
  type : string;
  question :IQuestion;
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
    case "UPDATE_QUESTION":
      return {state, ...action.question}
    default:
      return state;
  }
};
