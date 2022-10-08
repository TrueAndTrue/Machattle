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
import { UserFriend } from './UserFriend'

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

export class User extends Model<IUser, UserCreationAttributes> {
  public id! : number
  public uid! :string
  public rank! :string;
  public rating! : number;
  public username! : string
  public image! : string;
  
  public addQuestion!: HasManyAddAssociationMixin<Question, number>;
  public addChallenge!: HasManyAddAssociationMixin<Challenge, number>;
  public addFriend! : HasManyAddAssociationMixin<User, string>;

  public readonly questions?: Question[];
  public readonly challanges?: Challenge[];

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
      allowNull :false
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

//super many-to-many + self association
User.belongsToMany(User, { as: 'friends', through: 'userFriends' })
User.hasMany(UserFriend);
UserFriend.belongsTo(User);


//two 1-to-many associations between user and challanges
User.hasMany(Challenge, {
  sourceKey: "id",
  foreignKey: "winnerId",
  as: "WonChallanges",
});
User.hasMany(Challenge, {
  sourceKey: "id",
  foreignKey: "loserId",
  as: "LostChallanges",
});
Challenge.belongsTo(User, { foreignKey: "winnerId"});
Challenge.belongsTo(User, { foreignKey: "loserId"});

//many-to-many between user & friend
User.belongsToMany(Question, {through : "userQuestion"} );
Question.belongsToMany(User, {through: "userQuestion"});