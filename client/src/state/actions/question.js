export const UPDATE_CURRENTANSWER = 'UPDATE_CURRENTANSWER';
export const UPDATE_SUBMITTEDANSWER = 'UPDATE_SUBMITTEDANSWER';

export const updateCurrentAnswer = (currentAnswer) => ({
  type: UPDATE_CURRENTANSWER,
 currentAnswer,
});
export const updateSubmittedAnswer = (submittedAnswer) => ({
  type: UPDATE_SUBMITTEDANSWER,
 submittedAnswer,
});