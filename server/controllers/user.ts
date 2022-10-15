import { Request, Response } from "express";
import { User } from "../models/User";
import { Question } from "../models/Question";
import { Challenge } from "../models/Challenge";

const ranks = ['Bronze 4', 'Bronze 3', 'Bronze 2', 'Bronze 1', 'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3', 'Gold 2', 'Gold 1', 'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3', 'Diamond 2', 'Diamond 1', 'Palladium 4', 'Palladium 3', 'Palladium 2', 'Palladium 1'];


export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "rating", "image"],
      order: [["rating", "DESC"]],
      limit: 10,
    });
    res.status(200).send({ error: false, res: users });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting Exercises" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "rating", "image"],
      order: [["rating", "DESC"]],
    });
    res.status(200).send({ error: false, res: users });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting Exercises" });
  }
};

export const updateRank = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    const { rankChange } = req.body.change;
    let user = await User.findOne({
      where: { uid }
    });
    const rank: any = user?.rank;
    console.log(rankChange)

    if (user && rank) {
      const mp = parseInt(rank[1]);
      const rankStr = rank[0];
      if (mp + rankChange >= 100) {
        let index = 0;
        ranks.find((currRank, i) => {
          index = i;
          return currRank === rankStr;
        });
        const newRank = ranks[index + 1]
        if (!newRank) {
          res.status(200).send({ error: false, res: "You are the highest rank possible!" })
        }
        user.set({
          rank: [newRank, "0"]
        });
        user = await user.save();
        res.status(200).send({ error: false, res: "Rank has been increased!" });
      }
      else if (mp + rankChange < 0) {
        const remainder = mp + rankChange 
        let index = 0;
        ranks.find((currRank, i) => {
          index = i;
          return currRank === rankStr;
        });
        const newRank = ranks[index - 1];
        if (!newRank) {
          res.status(200).send({ error: false, res: "You are the lowest rank possible! Try some practice challenges! :)" })
        }
        user.set({
          rank: [newRank, JSON.stringify(100 + remainder)]
        })
        user = await user.save();
        res.status(200).send({ error: false, res: "Rank has been decreased!" });
      }
      else {
        const newMp = mp + rankChange;
        user.set({
          rank: [rankStr, newMp]
        });
        user = await user.save();
        res.status(200).send({ error: false, res: "MP has been changed!" });
      }

    }


  } catch (error) {
    res.status(500).send({ error: true, res: "Error updating rank" });
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body.user;
    const userExists = await User.findOne({
      where: { username: newUser.username },
    });
    if (!userExists) {
      const user = await User.create(newUser);
      res.status(201).send({ error: false, res: user });
    } else {
      res.status(409).send({ error: true, res: "Username Already Exists!" });
    }
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Creating New User" });
  }
};

export const getUserByUsername = async(req:Request, res :Response) =>{
  try{
    const { username } = req.params;
    const user = await User.findOne({ where: { username }, include : {model :User , as : 'friends' } });
    if (user) {
      res.status(200).send({ error : false , res: user });
    } else {
      res.status(404).send({ error : true, res :'User Does Not Exist' });
    }
  } catch(e) {
    res.status(500).send({ error :true , res :'Error Getting User' });
  }
}

export const getUserById = async(req:Request, res :Response) =>{
  try{
    const { uid } = req.params
    const user = await User.findOne({where: { uid }, include : {model :User , as : 'friends' } })
    if (user) {
      res.status(200).send({error :false, res :user})
    } else {
      res.status(404).send({error :true , res:'User Does Not Exist'})
    }
  } catch(e) {
    res.status(500).send({error :true , res :'Error Getting User'})
  }
}

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { friendUID } = req.body;
    const { uid } = req.params;
    const user = await User.findOne({
      where: { uid },
      include: { model: User, as: "friends" },
    });
    const friend = await User.findOne({ where: { uid: friendUID } });
    if (user && friend) {
      const hasFriend = user.getDataValue("friends")?.filter((user) => {
        //looks over users friends
        return friendUID === user.uid;
      }).length;

      if (!hasFriend) {
        user.addFriend(friend);
        res
          .status(200)
          .send({ error: false, res: "Friend added successfully" });
      } else
        res
          .status(409)
          .send({ error: true, res: "Error, User Already Has Friend" });
    } else {
      res.status(404).send("User Does Not Exist");
    }
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Adding Friend" });
  }
};

export const addExercise = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.body;
    const { uid } = req.params;
    const user = await User.findOne({
      where: { uid },
      include: {
        model: Question,
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    });
    const question = await Question.findOne({ where: { id: questionId } });
    if (user && question) {
      const completedQuestion = user
        .getDataValue("Questions")
        ?.filter((question) => {
          return questionId === question.id;
        }).length;
      if (!completedQuestion) {
        user.addQuestion(question);
        res
          .status(200)
          .send({ error: false, res: "Exercise Added To Completed Exercises" });
      } else
        res.status(409).send({
          error: true,
          res: "Error, User Has Already Completed Exercise",
        });
    }
  } catch (e) {
    res
      .status(500)
      .send({ error: true, res: "Error Adding To Completed Exercises" });
  }
};

export const getUserExercises = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({
      where: { uid },
      include: { model: Question },
    });
    const completedQuestions = user?.getDataValue("Questions");
    res.status(200).send({ error: false, res: completedQuestions });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting User Exercises" });
  }
};

export const getUserChallenges = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const wonChallenges = await Challenge.findAll({
      where: { winnerUsername: username },
    });
    const lostChallenges = await Challenge.findAll({
      where: { loserUsername: username },
    });

    const completedChallenges = [...lostChallenges, ...wonChallenges ];
    res.status(200).send({ error: false, res: completedChallenges });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting User Challenges" });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({
      where: { uid },
      include: { model: User, as: "friends" },
    });
    const friends = user?.getDataValue("friends");
    res.status(200).send({ error: false, res: friends });
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Getting User Friends" });
  }
};

export const updateImg = async (req:Request , res : Response) => {
  try {
    const { image, uid } = req.body;
    console.log(image,uid)
    const user = await User.update(
      { image },
      { where: { uid} }
    )
    if (!user) return res.status(404).send("User Does Not Exist");
    return res.status(201).send({error :false, res:"User Image Updated SuccessFully"})
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Updating User" });
  } 
}

export const removeFriend = async (req :Request, res :Response) => {
  try {
    const { friendUID } = req.body;
    const { uid } = req.params;
    const user = await User.findOne({
      where: { uid },
      include: { model: User, as: "friends" },
    });
    const friend = await User.findOne({ where: { uid: friendUID } });
    if (user && friend) {
      const hasFriend = user.getDataValue("friends")?.filter((user) => {
        //looks over users friends
        return friendUID === user.uid;
      }).length;

      if (hasFriend) {
        user.removeFriend(friend);
        res
          .status(200)
          .send({ error: false, res: "Friend removed successfully" });
      } else
        res
          .status(404)
          .send({ error: true, res: "Error, User Dosen't Have Friend" });
    } else {
      res.status(404).send("User Does Not Exist");
    }
  } catch (e) {
    res.status(500).send({ error: true, res: "Error Removing Friend" });
  }
}