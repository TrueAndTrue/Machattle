import express, { Router } from 'express'

import { userRoutes } from "./userRoutes";
import { challengeRoutes } from './challengeRoutes';
import { exerciseRoutes } from './exerciseRoutes';

const rootRouter = Router();

rootRouter.use("/api/users", userRoutes);
rootRouter.use("/api/challanges", challengeRoutes);
rootRouter.use("/api/exercises", exerciseRoutes);

export { rootRouter };