import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Users } from './users.model';

@Table
export class Books extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4 })
  id: string;

  @ForeignKey(() => Users)
  @Column
  userId: string;

  @Column
  author: string;

  @Column
  title: string;

  @Column
  description: string;

  @BelongsTo(() => Users, 'userId')
  user: Users;
}
