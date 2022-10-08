import { Request, Response } from "express";
import { Challenge } from "../models/Challenge"
import { challengeRoutes } from "../router/challengeRoutes";


export const createChallenge = async (req :Request, res :Response) => {
  try{
    const {winner, loser, question, tie} = req.body
    const challenge = await Challenge.create({tie})
    challenge.addQuestion(question)

  } catch (e) {
    res.status(500).send({error :e , message :'error creating new Challenge'})
  }
}

export const getChallengeById = async(req:Request, res :Response) =>{
  try{
    const { id } = req.params
    const challenge = await Challenge.findByPk(id)
    if (challenge) {
      res.status(200).send(challenge)
    } else {
      res.status(404).send({message :'Challenge Does Not Exist'})
    }
  } catch(e) {
    res.status(500).send({error :e , message :'Error Getting Challenge'})
  }
}

export const getRecentChallenges = async(req:Request, res :Response) =>{
  try{
    const challenges = await Challenge.findAll({ limit: 10, order: [['updatedAt', 'DESC']]});
    res.status(200).send(challenges)
  } catch(e) {
    res.status(500).send({error :e , message :'Error Getting Recent Challenges'})
  }
}