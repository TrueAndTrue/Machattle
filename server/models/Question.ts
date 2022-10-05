import { DataTypes, Deferrable, Model, Optional } from 'sequelize'
import { sequelize }  from './index'
import { IQuestion } from './modelTypes'

interface QuestionInput extends Optional<IQuestion, 'id'> {}
interface QuestionOuput extends Required<IQuestion> {}

class Question extends Model<QuestionInput, QuestionOuput> {
  declare id: number;
  declare question :string;
  declare tests : string[];
  declare difficulty :string;
} 

Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
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
  timestamps: false,
  sequelize: sequelize,
  paranoid: true
});

export { Question }; 