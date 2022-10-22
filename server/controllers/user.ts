import { Request, Response } from "express";
import { User } from "../models/User";
import { Question } from "../models/Question";
import { Challenge } from "../models/Challenge";
import { Room } from "../models/Room";

const ranks = ['Bronze 4', 'Bronze 3', 'Bronze 2', 'Bronze 1', 'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3', 'Gold 2', 'Gold 1', 'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3', 'Diamond 2', 'Diamond 1', 'Palladium 4', 'Palladium 3', 'Palladium 2', 'Palladium 1'];

function rankToRating(rank : string[]) : number {
  const sheildMap = {'Bronze' :0, 'Silver' :400, 'Gold':800, 'Platinum' :1200, 'Diamond' :1600, 'Palladium':2000 }
  const levelMap = {'4': 0, '3':100, '2' :200, '1' :300};
  type sheilds = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Palladium'
  type levels = '1' |'2' |'3' | '4'
  const [sheild,level] = rank[0].split(" ")
  const rating = sheildMap[sheild as sheilds] + levelMap[level as levels] + parseInt(rank[1])
  return rating
}

function ratingToRank( rating:number ) :string[] {
  const sheildMap = {0 :'Bronze',  1 : 'Silver', 2 :'Gold', 3: 'Platinum', 4: 'Diamond',5 : 'Palladium' }
  const levelMap = {0 : '4', 1 :'3', 2:  '2', 3: '1' };
  type sheildKeys = 0 |1 | 2 | 3 | 4 | 5
  type levelKeys = 0 | 1 | 2 | 3 
  const sheildKey = Math.floor(rating/400);
  const levelKey = Math.floor((rating-sheildKey*400)/100)
  const mp = (rating-sheildKey*400-100*levelKey).toString()
  const rankStr = sheildMap[sheildKey as sheildKeys] + " " + levelMap[levelKey as levelKeys]
  return [rankStr, mp]
}

export const convertUserRatings = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll().then((results) => {
      if(results){
        results.forEach(result => {
          const rank = result.getDataValue('rank')
          result.set({rating : rankToRating(rank)});
          result.save();
        })
      }
   });
    res.status(200).send({ error: false, res: 'rating updated'});
  } catch (e) {
    res.status(500).send({ error: true, res: "Error updating ranks" });
  }
};

export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "rating", "image", "rank"],
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

export const getRoom = async (req: Request, res: Response) =>{
  try {
    const rooms = await Room.findAll();
    res.status(200).send({ error: false, res: rooms });
  } catch (error) {
    res.status(500).send({ error: true, res: "Error getting rooms."});
  }
}

export const updateRank = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    const { rankChange } = req.body.change;
    const user = await User.findOne({where : {uid}})
    let rating = user?.getDataValue('rating')
    if(!user) return res.status(404).send({error : true, res : 'Error Retrieving User'})
    if(!rating) return res.status(400).send({error : true, res : 'Error In Users Rating'})
    
    rating += Number(rankChange)
    const rank = ratingToRank(rating)
    user.set({rating, rank});
    await user.save()
    return res.status(201).send({error :false, res : "Rank Successfully Updated"})
  } catch (error) {
    res.status(500).send({ error: true, res: "Error Updating Rank" });
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

interface DatedChallenge extends Challenge{
  createdAt :Date
}

export const getUserChallenges = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const wonChallenges = await Challenge.findAll({
      where: { winnerUsername: username },
    });
    const lostChallenges = await Challenge.findAll({
      where: { loserUsername: username },
    });

    const completedChallenges = [...lostChallenges, ...wonChallenges ] as DatedChallenge[];
    const sortedChallenges = completedChallenges.sort((challenge1, challenge2) => {
       return challenge2.createdAt.getTime() - challenge1.createdAt.getTime()
      })
    res.status(200).send({ error: false, res: sortedChallenges });
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