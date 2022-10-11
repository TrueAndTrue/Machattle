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

const {
  UPDATE_MATCH
} = require('./actions/match');

const match = (match = {
  player1: '',
  player2: '',
  matchFound: false,
  winner: '',
  loser: '',
  roomId: ''
  }, 
  action
) => {
  switch (action.type) {
    case UPDATE_MATCH: {
      const { player1, player2, matchFound, winner, loser, roomId } = action.matchInfo;
      return {...match, player1, player2, matchFound, winner, loser, roomId}
    }
    default: 
      return {...match}
  }
}


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

export default combineReducers({ status, currentUser, currentQuestion, currentBoard, match });