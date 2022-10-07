import { combineReducers } from 'redux';

//import actions
//user actions
//question actions

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
    tests: [],
    attempts: 0,
  },
  action
) => {
  switch (action.type) {
    default:
      return currentQuestion;
  }
};

export default combineReducers({ status, currentUser, currentQuestion });