import {
  Column,
  Model,
  Table,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Books } from './books.model';

@Table
export class Users extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4 })
  id: string;

  @Column
  fullname: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => Books, 'userId')
  books: Books[];

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(instance: Users) {
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = bcrypt.hashSync(instance.password, saltRounds);
    }
  }
}
