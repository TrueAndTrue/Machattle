import { Router } from "express";

import { userRoutes } from "./userRoutes";
import { challengeRoutes } from "./challengeRoutes";
import { exerciseRoutes } from "./exerciseRoutes";
import { messageRoutes } from "./messageRoutes";

const rootRouter = Router();

rootRouter.use("/users", userRoutes);
rootRouter.use("/challenges", challengeRoutes);
rootRouter.use("/exercises", exerciseRoutes);
rootRouter.use("/messages", exerciseRoutes);

export { rootRouter };
