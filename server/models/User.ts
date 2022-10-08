import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  Model,
  Optional,
  DataTypes,
} from "sequelize";
import { Challenge } from './Challenge'
import { sequelize } from './index'
import { Question } from './Question';
import { IUser } from './types';

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

export class User extends Model<IUser, UserCreationAttributes> {
  public id! : number
  public uid! :string
  public rank! :string;
  public rating! : number;
  public username! : string
  public image! : string;
  
  public addQuestion!: HasManyAddAssociationMixin<Question, number>;
  public addFriend! : HasManyAddAssociationMixin<User, string>;
  public readonly questions?: Question[];
  public readonly challanges?: Challenge[];

  public static associations: {
    questions: Association<User, Question>;
    friends: Association<User, User>;
    challange :Association<User, Challenge>
  }; 

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull :false,
      unique:true
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    rank: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    image: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    rating : {
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.belongsToMany(User, { as: 'Friends', through: 'UserFriends' })

User.hasMany(Question, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "completedQuestions",
});

// //two 1-to-many associations between user and challanges
// User.hasMany(Challenge, {
//   sourceKey: "uid",
//   foreignKey: "winnerId",
//   as: "WonChallanges",
// });
// User.hasMany(Challenge, {
//   sourceKey: "uid",
//   foreignKey: "loserId",
//   as: "LostChallanges",
// });
// Challenge.belongsToMany(User, {through : 'UserChallenge'});


Challenge.belongsTo(User, { foreignKey: "winner"});
Challenge.belongsTo(User, { foreignKey: "loser"});
Question.belongsTo(User, {foreignKey: "ownerId"});