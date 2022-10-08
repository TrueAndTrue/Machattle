import express, { Express, Request, Response } from 'express'

import { getAllExercises, addExercise } from '../controllers/exercise';
import { addUser, getUser } from '../controllers/user'
import { addChallenge } from '../controllers/challenge';
const router = express.Router();

router.get('/exercises', getAllExercises);
router.post('/create/exercise',addExercise);

router.get('/user',getUser)
router.post('/create/user', addUser);

router.post('create/challenge', addChallenge)

export { router };