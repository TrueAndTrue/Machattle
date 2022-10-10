import { combineReducers } from 'redux';

//import actions
//user actions
//question actions
const {
  UPDATE_CURRENTANSWER,
  UPDATE_SUBMITTEDANSWER,
} = require('./actions/question');

const status = (status = {
  loggedIn: false,
  inQueue: false,
  inMatch: false,
  },
  action
) => {
  switch (action.type) {
    default:
      return status;
  }
};
const currentUser = (currentUser = {
    rank: '',
    username: '',
    rating: 0,
    id: 0,
    friends: [],
    challenges: [],
    imageLocation: '',
  },
  action
) => {
  switch (action.type) {
    default:
      return currentUser;
  }
};
const currentQuestion = (currentQuestion = {
    difficulty: '',
    question: '',
    currentAnswer: '',
    submittedAnswer: '',
    finalAnswer: '',
    tests: [],
    attempts: 0,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_CURRENTANSWER:
      return {...currentQuestion, currentAnswer: action.currentAnswer};
      case UPDATE_SUBMITTEDANSWER:
        return {...currentQuestion, submittedAnswer: action.submittedAnswer};
    default:
      return currentQuestion;
  }
};

export default combineReducers({ status, currentUser, currentQuestion });