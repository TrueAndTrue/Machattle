import { ILeaderBoardUser } from "../../types";

export const UPDATE_LEADERBOARD = "UPDATE_LEADERBOARD";
export const GET_TOP_USERS = "GET_TOP_USERS";

export const updateLeaderBoard = (newBoard: ILeaderBoardUser) => ({
  type: UPDATE_LEADERBOARD,
  newBoard,
});
