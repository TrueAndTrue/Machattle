import { Router } from "express";
import { addUser, getUserById, getUserByUsername } from '../controllers/user'

const router = Router();

router.get('/:id',getUserById)
router.get('/',getUserByUsername)
router.post('/create', addUser);

export {router as userRoutes}