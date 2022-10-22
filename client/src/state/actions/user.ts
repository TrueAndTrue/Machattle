import { IUser } from "../../types";

export const UPDATE_USER = "UPDATE_USER";
export const ADD_FRIEND = "ADD_FRIEND";
export const REMOVE_FRIEND ="REMOVE_FRIEND"

export const updateUser = (user: IUser) => ({
  type: UPDATE_USER,
  user,
});

export const addUserFriends = (user :IUser, friend :IUser) => ({
  type : ADD_FRIEND,
  user, 
  friend
});

export const removeUserFriends = (user :IUser,friend :IUser) => ({
  type : REMOVE_FRIEND,
  user,
  friend
});