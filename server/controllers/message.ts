import { Request, Response } from "express";
import { Message } from '../models/Message'
import { User } from "../models/User";

export const sendMessage = async (req: Request, res: Response) => {
  console.log('send!')
  try {
    const { message } = req.body
    console.log(message)
    const {senderUsername, receiverUsername} = message;
    if (!senderUsername || !receiverUsername) return res.status(404).send("No Sender specified")

    const receiver = await User.findOne({where : {username : receiverUsername}})
    if(!receiver) return res.status(404).send({error:true, res :"recieving address not found"})
    
    const newMessage = await Message.create(message);
    res.status(201).send({ error: false, res: 'Message Sent Successfully' });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Creating New Message" });
  }
};

export const getAllUserMail = async (req :Request, res : Response) => {
  try{
    const { username } = req.params;
    const user = await User.findOne({where : {username}})
    if(!user) return res.status(404).send("User Does Not Exist")
    const sentMessages = await Message.findAll({
      where : { senderUsername : username },
      attributes :['title', 'id', 'read', 'senderUsername', 'createdAt', 'receiverUsername'] ,
      limit: 15,
      order: [["updatedAt", "ASC"]],
    })
    const recievedMessages = await Message.findAll({
      where :{ receiverUsername : username },
      attributes:['title', 'id', 'read', 'senderUsername', 'createdAt', 'receiverUsername'] ,
      limit: 15,
      order: [["updatedAt", "ASC"]],
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

export const setAsRead = async(req :Request, res :Response) => {
  try{
    const {id} = req.body
    const message = await Message.update(
      { read : true },
      { where: {id} }
    )
    res.status(201).send({error :false, res : "Set Message As Read"})
  } catch (e) {
    res.status(500).send({error :true , res :"Error Setting Mail As Read"})
  }
}

export const deleteMessage = async (req: Request, res :Response) => {
  try{
    const { id } = req.body;
    const response = Message.destroy({where : { id} })
    return res.status(204).send({error:false, res:"Message Successfully deleted"})
  } catch {
    res.status(500).send({error :false, res :"Error Deleting Message"})
  }
}