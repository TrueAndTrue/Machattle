import { Model, Optional, DataTypes } from "sequelize";
import { sequelize }  from './index'
import { IQuestion } from './types'

type QuestionCreationAttributes = Optional<IQuestion, 'id'>;

export class Question extends Model<IQuestion, QuestionCreationAttributes> {
  public id!: number;
  public question! :string;
  public timeComplexity! :string;
  public tests! : string[];
  public difficulty! :string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ownerId: {
    type: DataTypes.INTEGER
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timeComplexity : {
    type : DataTypes.STRING
  },
  tests :{
    type : DataTypes.ARRAY(DataTypes.STRING),
    allowNull :false
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false
  }
} , {
  sequelize,
  tableName : 'questions'
});