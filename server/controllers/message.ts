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
    const { uid } = req.params;
    const user = User.findOne({where : {uid}})
    if(!user) return res.status(404).send("User Does Not Exist")

    const sentMessages = await Message.findAll({
      where : { senderUid : uid },
      attributes:['title', 'id']
    })
    const recievedMessages = await Message.findAll({
      where :{ receiverUid : uid },
      attributes:['title', 'id', 'read'] 
    });
    
    const messages = {sentMessages, recievedMessages}
    return res.status(200).send({error :false, res : messages})
  } catch (e) {
    res.status(500).send({error :true, res:"Error Getting User Mail"})
  }
}

export const getMailbyId = async (req :Request, res : Response) => {
  try{
    const { id } = req.params;
    const message =  await Message.findByPk(id)
    return res.status(200).send({error :false, res : message})
  } catch (e) {
    res.status(500).send({error :true, res:"Error Getting User Mail"})
  }
}