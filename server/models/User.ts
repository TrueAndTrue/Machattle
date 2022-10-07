import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import { Optional, DataTypes } from 'sequelize'

import { sequelize } from './index';
import { Question } from './Question';
import { IQuestion, IUser } from './modelTypes';

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

@Table
class User extends Model<IUser, UserCreationAttributes> {
  @Column
  declare id :number

  @Column
  declare rank :string;

  @Column
  declare rating : number;

  @Column
  declare username : string

  @Column
  declare image : string;

  @HasMany(() => User)
  declare friends :User[]

  @HasMany(() => Question)
  declare completedChallanges: Question[]
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rank: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image : {
    type :DataTypes.STRING,
    allowNull :false
  }
} , {
  timestamps: false,
  sequelize: sequelize,
  paranoid: true
});


export { User }; 