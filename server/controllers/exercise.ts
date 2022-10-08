import { Request, Response } from "express";
import { Question } from "../models/Question"
import { Inqueue } from '../models/Inqueue'

export const getAllExercises = async (req : Request, res : Response) => {
  try{ 
    const questions = await Question.findAll();
    res.status(200).send(questions)
  }catch (e) {
    res.status(500).send({error :e , message :'Error Getting Exercises' })
  }
}

export const getExerciseById = async (req : Request , res : Response) => {
  try{
    const { id } = req.params
    const question = await Question.findByPk(id)
    if (question) {
      res.status(200).send(question)
    } else {
      res.status(404).send({message :'Question Does Not Exist'})
    }
  } catch(e) {
    res.status(500).send({error : e , message :'Error Getting Exercise'})
  }
}

export const addExercise = async (req : Request, res : Response) => {
  try{
    const response = await Question.create(req.body.question)
    res.status(201).send({question : response})
  } catch (e) {
    res.status(500).send({error :e , message :'Error Creating New Exercise'})
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const response = await Inqueue.create(req.body.uid)
    res.status(201).send({uid: response})
  } catch (error) {
    res.status(500).send('ERROR')
  }
}