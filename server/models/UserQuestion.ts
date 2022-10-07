import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'

import { User } from './User'
import { Question } from './Question'

@Table
export class UserQuestion extends Model {
  @ForeignKey(() => User)
  @Column
  declare userId: number

  @ForeignKey(() => Question)
  @Column
  declare questionId: number
}