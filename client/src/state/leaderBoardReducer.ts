import { ILeaderBoardUser } from "../types";
import { UPDATE_LEADERBOARD } from "./actions/leaderBoard";

interface Action {
  type: string;
  newBoard: ILeaderBoardUser[];
}

const initialBoard = {
  users: [],
};

export const currentBoard = (state = initialBoard, action: Action) => {
  switch (action.type) {
    case UPDATE_LEADERBOARD:
      return { ...state, ...action.newBoard };
    default:
      return state;
  }
};
