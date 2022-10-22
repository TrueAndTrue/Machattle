export const UPDATE_LOGGED = "UPDATE_LOGGED";

export const updateLogged = (loggedIn: Boolean) => ({
  type: UPDATE_LOGGED,
  loggedIn,
});
