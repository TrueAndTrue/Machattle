import { combineReducers } from 'redux';

//import actions
//user actions
//question actions

const loggedIn = (loggedIn = {
  status: false,
  },
  action
) => {
  switch (action.type) {
    default:
      return loggedIn;
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

export default combineReducers({ loggedIn, currentUser, currentQuestion });