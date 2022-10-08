import { Request, Response } from "express";
import { User } from "../models/User"
import { Question } from "../models/Question";
import { Challenge } from '../models/Challenge'

export const getAllUsers = async (req :Request, res :Response) => {
  try{ 
    const users = await User.findAll();
    res.status(200).send(users)
  }catch (e) {
    res.status(500).send({error :e , message :'Error Getting Exercises' })
  }
}

export const addUser = async (req :Request, res :Response) => {
  try{
    const newUser = req.body.user
    const userExists = await User.findOne({where: { username: newUser.username } })
    if(!userExists){
      const user = await User.create(newUser)
      res.status(201).send({ user })
    } else {
      res.status(409).send({message : 'Username Already Exists!'})
    }
  } catch (e) {
    res.status(500).send({error :e , message :'Error Creating New User'})
  }
}

export const getUserByUsername = async(req:Request, res :Response) =>{
  try{
    const { username } = req.body.user
    const user = await User.findOne({where: { username } })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('User Does Not Exist')
    }
  } catch(e) {
    res.status(500).send({error :e , message :'Error Getting User'})
  }
}

export const getUserById = async(req:Request, res :Response) =>{
  try{
    const { uid } = req.params
    const user = await User.findOne({where: { uid } })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('User Does Not Exist')
    }
  } catch(e) {
    res.status(500).send({error :e , message :'Error Getting User'})
  }
}

export const addFriend = async( req :Request, res :Response) => {
  try{
    const { uid, friendUID } = req.body
    const user = await User.findOne({
      where : { uid },
      include : {model :User , as : 'friends' }
    })
    const friend = await User.findOne({where : {uid :friendUID}}) 
    if (user && friend) {

      const hasFriend = user.getDataValue('friends')?.filter(user => {
        return friendUID === user.uid
      }).length;

      if (!hasFriend){
        user.addFriend(friend);
        res.status(200).send({error:false, res :'Friend added successfully' });
      } 
      else res.status(409).send({error:true, res : "Error, User Already Has Friend"});

    } else {
      res.status(404).send('User Does Not Exist');
    }
  } catch(e) {
    res.status(500).send({error :true , res :'Error Adding Friend'});
  }
}

export const addExercise = async  (req : Request, res : Response) => {
  try { 
    const { uid, questionId } = req.body
    const user = await User.findOne({
      where: { uid },
      include : {
        model : Question,
        attributes: ['id'],
        through: {
          attributes: []
        }
      }
    })
    const question = await Question.findOne({where : {id : questionId}})
    if (user && question){
      const completedQuestion = user.getDataValue('Questions')?.filter(question =>{
        return questionId === question.id
      }).length
      if (!completedQuestion){
        user.addQuestion(question)
        res.status(200).send({error : false, res : "Exercise Added To Completed Exercises"})
      }
      else res.status(409).send({error :true, res :"Error, User Has Already Completed Exercise"})
    }
  } catch (e) {
    res.status(500).send({error : true , res :'Error Adding To Completed Exercises'})
  }
}
