import { IChallenge, IQuestion, IUser } from "./models/types";

const mockUser : IUser = {
  //primary auto incremented key
  id:4,

  //id generated by Auth0 for authorizations
  uid:"auth0|6348577b8d3ef662e02837fc",

  //unique username, picked by user upon account creation
  username:"Shado",
  
  // measure of users skill level, ["metal level", "mp"] 
  rank:["Bronze 1","40"],

  //location of image
  image:"/pfp//4.png",

  // number maped from rank, used for leaderboard
  rating:340
};

const mockChallenge :IChallenge = {
  id :1, //primary unique auto incremented id
  tie :false, // if challenge was a draw
  winnerUsername : "GOAT", //winners username
  loserUsername : "Zangoose", //losers username
  questionId : 2 // id of question associated with challenge
};

const mockQuestion : IQuestion = {
  //primary unique auto incremented id
  id :1,
 
  //Description of problem to be solve
  question:"You're counting the blocks in a pyramid. The 1st layer has one block, the 2nd layer is a square with 2 blocks on each side, the third a square with 3 blocks on each side and so on until the botom layer. Write a function called countBlocks that takes n as an input and returns the number of blocks in a pyramind with n layers",
  
   //The time complexity of the optimal solution
  timeComplexity:"O(1)",

  //tests to determine whether a question has been answered correctly
  //each element represents ["user input", "expected output"]
  tests:[["1","1"],["2","5"],["4","30"],["6","91"],["20","2870"]],

  //the difficulty of the question
  difficulty:"2",

  //the name of the function for to be tested
  functionName:"countBlocks",

  //function parameters
  parameters:["n"]
}

const mockMessage = {
  id:3,
  title:"New Message", //message title
  content:"Well hello", //message content
  read:true, //boolean to determine if the message has been viewed
  senderUsername:"Menacing Lamp", //senders username
  receiverUsername:"Zangoose" //receivers username
}