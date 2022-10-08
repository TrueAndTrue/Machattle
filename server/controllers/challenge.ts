import { Request, Response } from "express";
import { Challenge } from "../models/Challenge"


export const addChallenge = async (req :Request, res :Response) => {
  try{
    const response = await Challenge.create(req.body.challenge)

    res.status(201).send({challenge : response})
  } catch (e) {
    res.status(500).send({error :e , message :'error creating new Challenge'})
  }
}

export const getChallenge = async(req:Request, res :Response) =>{
  try{
    const { id } = req.params
    const challenge = await Challenge.findByPk(id)
    if (challenge) {
      res.status(200).send(challenge)
    } else {
      res.status(404).send('Challenge Does Not Exist')
    }
  } catch(e) {
    res.status(500).send('Error is getting user')
  }
}