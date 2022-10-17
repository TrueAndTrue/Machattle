import { Request, Response } from "express";
import { Message } from '../models/Message'
import { User } from "../models/User";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body
    const {senderUsername, receiverUsername} = message;
    if (senderUsername && receiverUsername) {
      const newMessage = await Message.create(message);
      res.status(201).send({ error: false, res: 'Message Sent Successfully' });
    } else {
      res.status(409).send({ error: true, res: "Invalid User" });
    }
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Creating New Message" });
  }
};

export const getAllUserMail = async (req :Request, res : Response) => {
  try{
    const { username } = req.params;
    const user = User.findOne({where : {username}})
    if(!user) return res.status(404).send("User Does Not Exist")

    const sentMessages = await Message.findAll({where :{senderUsername : username } })
    const recievedMessages = await Message.findAll({where :{receiverUsername : username } })
    const messages = {sentMessages, recievedMessages}
    return res.status(200).send({error :false, res : messages})
  } catch (e) {
    res.status(500).send({error :true, res:"Error Getting User Mail"})
  }
}