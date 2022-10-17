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
  getRoom,
  updateRank,
  updateImg,
  getUserFriends,
  removeFriend
} from "../controllers/user";

const router = Router();

router.get("/", getAllUsers);
router.get("/room", getRoom);
router.get("/leaderBoard", getTopUsers);
router.get("/username=:username", getUserByUsername);
router.get("/:uid", getUserById);
router.get("/:uid/friends", getUserFriends);
router.get("/:uid/exercises", getUserExercises);
router.get("/:username/challenges", getUserChallenges);

router.put("/rank", updateRank)
router.put("/update/image", updateImg)
router.put("/:uid/addFriend", addFriend);
router.put("/:uid/removeFriend", removeFriend);
router.put("/:uid/addExercise", addExercise);


router.post("/create", addUser);

export { router as userRoutes };
