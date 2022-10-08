import { Request, Response } from "express";
import { User } from "../models/User"

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