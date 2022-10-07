import express, { Express, Request, Response } from 'express'

import { getAllExercises, addExercise } from '../controllers/ExerciseController';

const router = express.Router();

router.get('/exercises', getAllExercises)
router.post('/create/exercise',addExercise);


export { router };