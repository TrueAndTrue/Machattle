import { combineReducers } from 'redux';
import { currentQuestion} from './questionReducer'
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


export default combineReducers({ status, currentUser, currentQuestion });