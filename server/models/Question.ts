import { DataTypes, Optional } from 'sequelize'
import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'

import { User } from './User'
import { UserQuestion } from './UserQuestion'
import { sequelize }  from './index'
import { IQuestion } from './modelTypes'

type QuestionCreationAttributes = Optional<IQuestion, 'id'>;

@Table
class Question extends Model<IQuestion, QuestionCreationAttributes> {
  @Column
  declare id: number;

  @Column
  declare question :string;
  
  @Column
  declare tests : string[];

  @Column
  declare difficulty :string;

  @BelongsToMany(() => User, ()=> UserQuestion)
  declare completedQuestions : Question[]
  
} 

Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
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