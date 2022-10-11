import { combineReducers } from 'redux';
import { currentQuestion} from './questionReducer'
import { currentBoard } from './leaderBoardReducer'
//import actions
//user actions
//question actions
// const {
//   UPDATE_CURRENTANSWER,
//   UPDATE_SUBMITTEDANSWER,
// } = require('./actions/question');

const {
  UPDATE_LOGGED
} = require('./actions/status');

const {
  UPDATE_USER
} = require('./actions/user');


const status = (status = {
  loggedIn: false,
  inQueue: false,
  inMatch: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_LOGGED:
      return {...status, loggedIn: action.loggedIn};
    default:
      return {...status};
  }
};
const currentUser = (currentUser = {
    rank: '',
    username: '',
    rating: 0,
    uid: 0,
    friends: [],
    challenges: [],
    image: '',
  },
  action
) => {
  switch (action.type) {
    case UPDATE_USER: {
      const { uid, rank, username, rating, image } = action.user
      return {...currentUser, uid, rank, username, rating, image }
    }
    default:
      return currentUser;
  }
};

export default combineReducers({ status, currentUser, currentQuestion, currentBoard });