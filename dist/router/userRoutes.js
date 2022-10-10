"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
exports.userRoutes = router;
router.get('/', user_1.getUserByUsername);
router.get('/:uid', user_1.getUserById);
router.get('/:uid/exercises', user_1.getUserExercises);
router.get('/:uid/challenges', user_1.getUserChallenges);
router.put('/:uid/addFriend', user_1.addFriend);
router.put('/:uid/addExercise', user_1.addExercise);
router.post('/create', user_1.addUser);
