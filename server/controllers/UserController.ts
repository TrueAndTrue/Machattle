import { Request, Response } from "express";
import { User } from "../models/User"

export const getAllUsers = async (req :Request, res :Response) => {
  try{ 
    const users = await User.findAll();
    res.status(200).send(users)
  }catch (e) {
    res.status(500).send({error :e , message :'error getting exercises' })
  }
}

export const addUser = async (req :Request, res :Response) => {
  try{
    const newUser = req.body.user
    const userExists = await User.findOne({where: { username: newUser.username } })
    if(!userExists){
      const response = await User.create(newUser)
      res.status(201).send({user : response})
    } else {
      res.status(409).send({message : 'Username Already Exists!'})
    }
  } catch (e) {
    res.status(500).send({error :e , message :'error creating new user'})
  }
}

export const getUser = async(req:Request, res :Response) =>{
  try{
    const username = req.body.user.username
    const user = await User.findOne({where: { username } })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('User Does Not Exist')
    }
  } catch(e) {
    res.status(500).send('Error is getting user')
  }
}