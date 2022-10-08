import {
  Association,
  HasManyAddAssociationMixin,
  Model,
  Optional,
  DataTypes,
} from "sequelize";

import { sequelize } from './index'
import { Question } from './Question';
import { IChallenge } from './types';
import { User } from "./User";

interface ChallengeCreationAttributes extends Optional<IChallenge, 'id'> {}

export class Challenge extends Model<IChallenge, ChallengeCreationAttributes> {
  public id! : number
  public tie!: boolean
  public winner! : User;
  public loser! : User;
  public readonly question?: Question;

  public addQuestion!: HasManyAddAssociationMixin<Question, number>;

  public static associations: {
    question : Association<Challenge, Question>
    winner: Association<User,Challenge >;
    loser: Association<User, Challenge>;
  }; 

}

Challenge.init(
  {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      tie :{
        type :DataTypes.BOOLEAN
      }
  },
  {
      tableName: "challenges",
      sequelize,
  }
);

Challenge.hasOne(Question);
Question.belongsTo(Challenge);