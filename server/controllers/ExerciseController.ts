import { Request, Response } from "express";
import { Question } from "../models/Question"

export const getAllExercises = async (req :Request, res :Response) => {
  try{ 
    const questions = await Question.findAll();
    res.status(200).send(questions)
  }catch (e) {
    res.status(500).send({error :e , message :'error getting exercises' })
  }
}

export const addExercise = async (req :Request, res :Response) => {
  try{
    const { question } = req.body
    const response = await Question.create(question)
    res.status(201).send(response)
  } catch (e) {
    res.status(500).send({error :e , message :'error creating new Exercise'})
  }
}