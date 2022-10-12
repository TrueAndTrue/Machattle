import { IQuestion } from "../../types";

export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_EDITORPROMPT = "UPDATE_EDITORPROMPT";
export const UPDATE_CURRENTANSWER = "UPDATE_CURRENTANSWER";
export const UPDATE_SUBMITTEDANSWER = "UPDATE_SUBMITTEDANSWER";
export const UPDATE_TESTS = "UPDATE_TESTS";
export const UPDATE_ATTEMPTS = "UPDATE_ATTEMPTS";

export const updateQuestion = (question: IQuestion) => ({
  type: UPDATE_QUESTION,
  question,
});
export const updateEditorPrompt = (editorPrompt: string) => ({
  type: UPDATE_EDITORPROMPT,
  editorPrompt,
});
export const updateCurrentAnswer = (currentAnswer: string) => ({
  type: UPDATE_CURRENTANSWER,
  currentAnswer,
});
export const updateSubmittedAnswer = (submittedAnswer: string) => ({
  type: UPDATE_SUBMITTEDANSWER,
  submittedAnswer,
});
export const updateTests = (tests: []) => ({
  type: UPDATE_TESTS,
  tests,
});
export const updateAttempts = (attempts: number) => ({
  type: UPDATE_ATTEMPTS,
  attempts,
});
