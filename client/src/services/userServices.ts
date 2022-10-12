let BASE_URL: string;
process.env.NODE_ENV === "production"
  ? (BASE_URL = "https://machattle.herokuapp.com/api")
  : (BASE_URL = "http://localhost:3030/api");

export const addUser = async (uid: string, username: string, image: string) => {
  try {
    const rank = "Silver 4";
    const rating = 1200;
    const response = await fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          uid,
          username,
          rank,
          image,
          rating,
        },
      }),
    });
    const data = await response.json();
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (uid: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/username=${username}`);
    const data = await response.json();
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = async (uid: string, friendUID: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/addFriend`, {
      headers: {
        "Content-Type": "application/json",
        method: "PUT",
        body: JSON.stringify({ uid, friendUID }),
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addExercise = async (uid: string, questionId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/addExercise`, {
      headers: {
        "Content-Type": "application/json",
        method: "PUT",
        body: JSON.stringify({ questionId }),
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUserExercises = async (uid: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/exercises`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};

export const getUserChallenges = async (uid: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/challenges`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};

export const getTopUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/leaderBoard`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};

export const getUserFriends = async (uid: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/friends`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};
