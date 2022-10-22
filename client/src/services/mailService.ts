import { IMessage } from "../types";

let BASE_URL: string;
process.env.NODE_ENV == "production"
  ? (BASE_URL = "https://machattle.herokuapp.com/api")
  : (BASE_URL = "http://localhost:3030/api");

export const getAllUserMail = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/all/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const { sentMessages, recievedMessages } = data.res;
    return { sentMessages, recievedMessages };
  } catch (e) {
    console.log(e);
  }
};

export const getMailById = async (uid: number) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/${uid}`, {
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

export const sendMessage = async (message: IMessage) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  };
  try {
    const response = await fetch(`${BASE_URL}/messages/send`, requestOptions);
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};

export const setMessageAsRead = async (id: number) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };
  const response = await fetch(`${BASE_URL}/messages/read`, requestOptions);
};

export const deleteMessage = async (id: number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };
  const response = await fetch(`${BASE_URL}/messages/delete`, requestOptions);
};
