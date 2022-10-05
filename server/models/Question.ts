import { DataTypes, Deferrable, Model, Optional } from 'sequelize'
import { sequelize }  from './index'
import { IQuestion } from './modelTypes'


type QuestionCreationAttributes = Optional<IQuestion, 'id'>;

class Question extends Model<IQuestion, QuestionCreationAttributes> {
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
    type: DataTypes.CHAR(500),
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