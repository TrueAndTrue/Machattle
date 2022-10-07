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
    const response = await User.create(req.body.user)
    res.status(201).send({user : response})
  } catch (e) {
    res.status(500).send({error :e , message :'error creating new Exercise'})
  }
}