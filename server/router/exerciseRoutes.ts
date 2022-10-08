import { Router } from "express";
import { getAllExercises, addExercise , getExerciseById } from '../controllers/exercise';

const router = Router();

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.post('/create',addExercise);

export {router as exerciseRoutes}