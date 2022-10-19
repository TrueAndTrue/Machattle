import { IChallenge } from "../types";

let BASE_URL: string;
process.env.NODE_ENV == "production"
  ? (BASE_URL = "https://machattle.herokuapp.com/api")
  : (BASE_URL = "http://localhost:3030/api");

export const getChallengeById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/challenge/${id}`, {
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

export const getRecentChallenges = async () => {
  try {
    const response = await fetch(`${BASE_URL}/challenges`, {
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

///meant to be called AFTER challenge is completed, when a winner and loser is declared
export const createChallenge = async (
  winId: string,
  loseId: String,
  questionId: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/challenges/create`, {
      method: "POST",
      body: JSON.stringify({ winId, loseId, questionId }),
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

const getUserChallenges = async (username: string) => {
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
