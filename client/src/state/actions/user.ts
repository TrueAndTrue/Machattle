import { IUser } from "../../types";

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user : IUser) => ({
  type: UPDATE_USER,
  user,
});
