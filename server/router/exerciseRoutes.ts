import { Router } from "express";
import {
  getAllExercises,
  addExercise,
  getExerciseById,
  getRandomExercise,
} from "../controllers/exercise";

const router = Router();

router.get("/", getAllExercises);
router.get("/random/:difficulty", getRandomExercise);
router.get("/:id", getExerciseById);

router.post("/create", addExercise);

export { router as exerciseRoutes };
