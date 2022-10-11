import {
  Association,
  HasManyAddAssociationMixin,
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
  public addChallenge! : HasManyAddAssociationMixin<Challenge, number>;
  
  public readonly questions?: Question[];
  public readonly challenges?: Challenge[];

  public static associations: {
    questions: Association<User, Question>;
    friends: Association<User, User>;
    challenges :Association<User, Challenge>
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

User.belongsToMany(User, { as: 'friends', through: 'UserFriends' })

//two 1-to-many associations between user and challanges
User.hasMany(Challenge, {
  sourceKey: "uid",
  foreignKey: "winnerId",
  as: "WonChallenges",
});
User.hasMany(Challenge, {
  sourceKey: "uid",
  foreignKey: "loserId",
  as: "LostChallenges"
});

Challenge.belongsTo(User, {foreignKey: "winnerId"});
Challenge.belongsTo(User, {foreignKey: "loserId"});
User.belongsToMany(Question, {through : 'userQuestions'});
Question.belongsToMany(User, {through : 'userQuestions'});