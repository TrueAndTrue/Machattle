import { Request, Response } from "express";
import { Challenge } from "../models/Challenge"
import { User } from '../models/User'

export const createChallenge = async (req :Request, res :Response) => {
  try{
    const {winnerUsername, loserUsername, questionId, tie} = req.body.challenge
    await Challenge.create({tie, winnerUsername, loserUsername, questionId})
    const winner = await User.findOne( {where :{username : winnerUsername } })
    const loser = await User.findOne( {where :{username : loserUsername } })
    const sentChallenge = {
      winner :winner?.getDataValue('username'), 
      loser :loser?.getDataValue('username')
    } 

    res.status(201).send({error :false , res :sentChallenge})
  } catch (e) {
    res.status(500).send({error :true , res :'error creating new Challenge'})
  }
}

export const getChallengeById = async(req:Request, res :Response) =>{
  try{
    const { id } = req.params
    const challenge = await Challenge.findByPk(id)
    if (challenge) {
      res.status(200).send({error :false, res : challenge})
    } else {
      res.status(404).send({error :true, res :'Challenge Does Not Exist'})
    }
  } catch(e) {
    res.status(500).send({error :true , res :'Error Getting Challenge'})
  }
}

export const getRecentChallenges = async(req:Request, res :Response) => {
  try{
    const challenges = await Challenge.findAll({ limit: 10, order: [['updatedAt', 'DESC']]});
    res.status(200).send({error :false , res :challenges})
  } catch(e) {
    res.status(500).send({error :e , message :'Error Getting Recent Challenges'})
  }
}