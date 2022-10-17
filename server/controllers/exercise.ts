import { Request, Response } from "express";
import { Question } from "../models/Question";

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll();
    res.status(200).send({ error: false, res: questions });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting Exercises" });
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (question) {
      res.status(200).send({ error: false, res: question });
    } else {
      res.status(404).send({ error: true, res: "Question Does Not Exist" });
    }
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting Exercise" });
  }
};

export const addExercise = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body.question);
    res.status(201).send({ error: false, res: question });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Creating New Exercise" });
  }
};

export const getRandomExercise = async (req: Request, res: Response) => {
  try {
    const { info } = req.params;
    const [difficulty,salt] = info.split('$')
    const questions = await Question.findAll({ where: { difficulty } });
    const numQuestions = questions.length;
    const questionIndex = parseInt(salt)% numQuestions;
    console.log(questionIndex)
    res.status(200).send({ error: false, res: questions[questionIndex] });
  } catch {
    res.status(500).send({ error: true, res: "Error Getting Random Exercise" });
  }
};
