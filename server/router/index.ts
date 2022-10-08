import express, { Router } from 'express'

import { userRoutes } from "./userRoutes";
import { challengeRoutes } from './challengeRoutes';
import { exerciseRoutes } from './exerciseRoutes';

const rootRouter = Router();

rootRouter.use("/users", userRoutes);
rootRouter.use("/challenges", challengeRoutes);
rootRouter.use("/exercises", exerciseRoutes);

export { rootRouter };