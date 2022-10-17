import { IMessage } from '../types'

let BASE_URL: string;
process.env.NODE_ENV == "production"
  ? (BASE_URL = "https://machattle.herokuapp.com/api")
  : (BASE_URL = "http://localhost:3030/api");


export const getAllUserMail = async (uid :string)  => {
  try {
    const response = await fetch(`${BASE_URL}/messages/${uid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const {sentMessages, recievedMessages}  = data.res
    return {sentMessages, recievedMessages}
  } catch (e) {
    console.log(e)
  }
}

export const getMailById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/${id}`, {
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

export const sendMessage = async (senderUsername : string, receiverUsername :string) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/send`, {
      headers: {
        method: "POST",
        "Content-Type": "application/json",
        body : JSON.stringify({senderUsername, receiverUsername})
      },
    });
    const data = await response.json();
    return data.res 
  } catch (e) {
    console.log(e);
  }
};