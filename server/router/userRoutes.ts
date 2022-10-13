import { Router } from "express";
import {
  addUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  addFriend,
  addExercise,
  getUserExercises,
  getUserChallenges,
  getTopUsers,
  updateImg,
  getUserFriends
} from "../controllers/user";

const router = Router();

router.get("/", getAllUsers);
router.get("/leaderBoard", getTopUsers);
router.get("/username=:username", getUserByUsername);
router.get("/:uid", getUserById);
router.get("/:uid/friends", getUserFriends);
router.get("/:uid/exercises", getUserExercises);
router.get("/:username/challenges", getUserChallenges);

router.put("/update/image", updateImg)
router.put("/:uid/addFriend", addFriend);
router.put("/:uid/addExercise", addExercise);


router.post("/create", addUser);

export { router as userRoutes };
