import express, { Express, Request, Response } from 'express'

import { getAllExercises, addExercise } from '../controllers/ExerciseController';

const router = express.Router();

router.get('/', (req :Request, res :Response ) => {
  res.send("Hello Heroku")}
);

router.get('/exercises', getAllExercises)
router.post('/create/exercise', async (req : Request, res :Response) => {
  console.log(req.body.question);
  res.send(req)
});

export { router };