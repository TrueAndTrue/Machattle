import { Request, Response } from "express";
import { User } from "../models/User";
import { Question } from "../models/Question";
import { Challenge } from '../models/Challenge';

export const getAllUsers = async (req :Request, res :Response) => {
  try{ 
    const users = await User.findAll();
    res.status(200).send({error :false ,res :users });
  }catch (e) {
    res.status(500).send({error :true , res :'Error Getting Exercises' });
  }
}

export const addUser = async (req :Request, res :Response) => {
  try{
    const newUser = req.body.user
    const userExists = await User.findOne( {where: { username: newUser.username } } );
    if(!userExists){
      const user = await User.create(newUser);
      res.status(201).send( {error : false, res: user } );
    } else {
      res.status(409).send({error :true, res : 'Username Already Exists!'});
    }
  } catch (e) {
    res.status(500).send({error :true , res :'Error Creating New User'});
  }
}

export const getUserByUsername = async(req:Request, res :Response) =>{
  try{
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
      res.status(200).send({ error : false , res: user });
    } else {
      res.status(404).send({ error : true, res :'User Does Not Exist' });
    }
  } catch(e) {
    res.status(500).send({ error :true , res :'Error Getting User' });
  }
}

export const getUserById = async(req:Request, res :Response) =>{
  try{
    const { uid } = req.params
    const user = await User.findOne({where: { uid } })
    if (user) {
      res.status(200).send({error :false, res :user})
    } else {
      res.status(404).send({error :true , res:'User Does Not Exist'})
    }
  } catch(e) {
    res.status(500).send({error :true , res :'Error Getting User'})
  }
}

export const addFriend = async( req :Request, res :Response) => {
  try{
    const { friendUID } = req.body
    const { uid } = req.params
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
    const { questionId } = req.body
    const { uid } = req.params
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

export const getUserExercises = async (req : Request, res :Response) => {
  try {
    const { uid } = req.params
    const user = await User.findOne({
      where: { uid },
      include : { model : Question}
    })
    const completedQuestions = user?.getDataValue('Questions');
    res.status(200).send({error : false, res : completedQuestions})
  }catch (e) {
    res.status(500).send({error: true , res : 'Error Getting User Exercises'})
  }
}

export const getUserChallenges = async (req :Request, res :Response) => {
  try {
    const { uid } = req.params;
    const wonChallenges = await Challenge.findAll({where : {winnerId : uid}});
    const lostChallenges = await Challenge.findAll({where : {loserId : uid}});
    const completedChallenges = { lostChallenges, wonChallenges };
    res.status(200).send({error : false, res : completedChallenges});
  } catch (e) {
    res.status(500).send({error: true , res : 'Error Getting User Challenges'});
  }
}