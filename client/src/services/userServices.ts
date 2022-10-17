let BASE_URL: string;
process.env.NODE_ENV === "production"
  ? (BASE_URL = "https://machattle.herokuapp.com/api")
  : (BASE_URL = "http://localhost:3030/api");

export const addUser = async (uid: string, username: string, image: string) => {
  try {
    const rank = ["Silver 4", "0"];
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

export const updateRank = async (uid: string, change: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/rank`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          uid
        },
        change: {
          rankChange: change
        }
      })
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

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
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ friendUID })
  }
  console.log('service')
  console.log(uid, friendUID)
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/addFriend`, requestOptions);
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

export const getUserChallenges = async (username: string) => {
  console.log(username)
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/challenges`, {
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

export const getRoom = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/room`)
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getTopUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/leaderBoard`);
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

export const updatePfp = async (uid:string, image :string) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, image })
  }
  try {
    const response = await fetch(`${BASE_URL}/users/update/image`, requestOptions);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const removeFriend = async (uid: string, friendUID: string) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ friendUID })
  }
  console.log('service')
  console.log(uid, friendUID)
  try {
    const response = await fetch(`${BASE_URL}/users/${uid}/removeFriend`, requestOptions);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};