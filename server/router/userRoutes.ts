import { Router } from "express";
import { addUser, getUserById, getUserByUsername, addFriend, addExercise, getUserExercises, getUserChallenges } from '../controllers/user';

const router = Router();

router.get('/',getUserByUsername);
router.get('/:uid',getUserById);
router.get('/:uid/exercises',getUserExercises);
router.get('/:uid/challenges',getUserChallenges);

router.put('/:uid/addFriend', addFriend);
router.put('/:uid/addExercise', addExercise);

router.post('/create', addUser);

export {router as userRoutes}