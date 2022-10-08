import { Router } from "express";
import { createChallenge, getRecentChallenges, getChallengeById } from '../controllers/challenge';

const router = Router();

router.get('/', getRecentChallenges)
router.get('/:id', getChallengeById)
router.post('/create', createChallenge)

export {router as challengeRoutes}