import { Router } from "express";
import { addChallenge, getRecentChallenges, getChallengeById } from '../controllers/challenge';

const router = Router();

router.get('/', getRecentChallenges)
router.get('/:id', getChallengeById)
router.post('/create', addChallenge)

export {router as challengeRoutes}