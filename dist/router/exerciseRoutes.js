"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRoutes = void 0;
const express_1 = require("express");
const exercise_1 = require("../controllers/exercise");
const router = (0, express_1.Router)();
exports.exerciseRoutes = router;
router.get('/', exercise_1.getAllExercises);
router.get('/:id', exercise_1.getExerciseById);
router.post('/create', exercise_1.addExercise);
