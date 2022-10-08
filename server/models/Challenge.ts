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

interface ChallengeCreationAttributes extends Optional<IChallenge, 'id'> {}

export class Challenge extends Model<IChallenge, ChallengeCreationAttributes> {
  public id! : number
  public question! : string
  
  public addQuestion!: HasManyAddAssociationMixin<Question, number>;
  
  public readonly Questions!: Question[];

  public static associations: {
    winner: Association<Challenge, Question>;
    loser: Association<Challenge, Question>;
  }; 

}

Challenge.init(
  {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      question: {
          type: new DataTypes.TEXT,
          allowNull: false,
      }
  },
  {
      tableName: "challenges",
      sequelize,
  }
);

Challenge.hasOne(Question, {as :'winner'});
Challenge.hasOne(Question, {as :'loser'});
Question.belongsTo(Challenge);