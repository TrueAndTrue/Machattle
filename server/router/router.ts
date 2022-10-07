import express, { Express, Request, Response } from 'express'

import { getAllExercises, addExercise } from '../controllers/ExerciseController';
import { addUser, getUser } from '../controllers/UserController'
const router = express.Router();

router.get('/exercises', getAllExercises);
router.post('/create/exercise',addExercise);

router.get('/user',getUser)
router.post('/create/user', addUser);


export { router };