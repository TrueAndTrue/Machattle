import { combineReducers } from "redux";
import { currentQuestion } from "./questionReducer";
import { currentBoard } from "./leaderBoardReducer";

const { UPDATE_LOGGED } = require("./actions/status");
const { UPDATE_USER, ADD_FRIEND, REMOVE_FRIEND } = require("./actions/user");
const { UPDATE_MATCH } = require("./actions/match");

const match = (
  match = {
    player1: "",
    player2: "",
    matchFound: false,
    winner: "",
    loser: "",
    roomId: "",
  },
  action: any
) => {
  switch (action.type) {
    case UPDATE_MATCH: {
      const { player1, player2, matchFound, winner, loser, roomId } =
        action.matchInfo;
      return { ...match, player1, player2, matchFound, winner, loser, roomId };
    }
    default:
      return { ...match };
  }
};

const status = (
  status = {
    loggedIn: false,
    inQueue: false,
    inMatch: false,
  },
  action: any
) => {
  switch (action.type) {
    case UPDATE_LOGGED:
      return { ...status, loggedIn: action.loggedIn };
    default:
      return { ...status };
  }
};
const currentUser = (
  currentUser = {
    rank: "",
    username: "",
    rating: 0,
    uid: 0,
    friends: [],
    challenges: [],
    image: "",
  },
  action: any
) => {
  switch (action.type) {
    case UPDATE_USER: {
      const { uid, rank, username, rating, image, friends } = action.user;
      return { ...currentUser, uid, rank, username, rating, image, friends };
    }
    case ADD_FRIEND: {
      const { user, friend } = action;
      const friends = [...user.friends, friend];
      return { ...user, friends };
    }
    case REMOVE_FRIEND: {
      const { user, friend } = action;
      const newFriends = user.friends.filter(
        (stillFriend: any) => stillFriend.uid != friend.uid
      );
      return { ...user, friends: [...newFriends] };
    }
    default:
      return currentUser;
  }
};

export default combineReducers({
  status,
  currentUser,
  currentQuestion,
  currentBoard,
  match,
});
