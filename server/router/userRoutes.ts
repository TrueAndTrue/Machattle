import { Router } from "express";
import { addUser, getUserById, getUserByUsername, addFriend, addExercise } from '../controllers/user';

const router = Router();

router.get('/:id',getUserById);
router.get('/',getUserByUsername);

router.put('/addFriend', addFriend);
router.put('/addExercise', addExercise)
router.post('/create', addUser);

export {router as userRoutes}