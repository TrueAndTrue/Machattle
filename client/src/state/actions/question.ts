import { IQuestion } from "../../types";

export const UPDATE_CURRENTANSWER = 'UPDATE_CURRENTANSWER';
export const UPDATE_SUBMITTEDANSWER = 'UPDATE_SUBMITTEDANSWER';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';

export const updateCurrentAnswer = (currentAnswer : string ) => ({
  type: UPDATE_CURRENTANSWER,
 currentAnswer,
});
export const updateSubmittedAnswer = (submittedAnswer:string ) => ({
  type: UPDATE_SUBMITTEDANSWER,
 submittedAnswer,
});
export const updateQuestion = (question : IQuestion) => ({
  type: UPDATE_QUESTION,
  payload : question
});