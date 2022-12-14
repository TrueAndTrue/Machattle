import { Association, Model, Optional, DataTypes } from "sequelize";

import { sequelize } from "./index";
import { Question } from "./Question";
import { IChallenge } from "./types";
import { User } from "./User";

interface ChallengeCreationAttributes extends Optional<IChallenge, "id"> {}

export class Challenge extends Model<IChallenge, ChallengeCreationAttributes> {
  public id!: number;
  public tie!: boolean;

  public readonly createdAt! :Date
  public readonly questionId!: number;

  public static associations: {
    question: Association<Challenge, Question>;
    winner: Association<User, Challenge>;
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
    tie: {
      type: DataTypes.BOOLEAN,
    },
    winnerUsername: {
      type: DataTypes.STRING,
    },
    loserUsername: {
      type: DataTypes.STRING,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: "challenges",
    sequelize,
  }
);

Challenge.belongsTo(Question, { foreignKey: "questionId" });
Question.hasMany(Challenge, { foreignKey: "questionId" });
