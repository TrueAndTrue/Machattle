import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  Model,
  Optional,
  DataTypes,
} from "sequelize";
import { Challenge } from "./Challenge";

import { sequelize } from './index'
import { Question } from './Question';
import { IUser } from './types';

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

export class User extends Model<IUser, UserCreationAttributes> {
  public id! : number
  public rank! :string;
  public rating! : number;
  public username! : string
  public image! : string;
  
  public addQuestion!: HasManyAddAssociationMixin<Question, number>;
  
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

User.hasMany(Challenge, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "completedChallanges",
});

Challenge.belongsTo(User, { foreignKey: "winner"});
Challenge.belongsTo(User, { foreignKey: "loser"});
Question.belongsTo(User, {foreignKey: "ownerId"});