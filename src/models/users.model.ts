import { NotFoundException } from '@nestjs/common';
import {
  Column,
  Model,
  Table,
  HasMany,
  BelongsToMany,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { UUIDV4, Transaction } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Roles, RolesEnum } from './roles.model';
import { UserHasRoles } from './user-has-roles.model';
import { Books } from './books.model';

@Table({ tableName: 'users' })
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

  @BelongsToMany(() => Roles, () => UserHasRoles, 'userId')
  roles: Roles[];

  @HasMany(() => Books, 'userId')
  books: Books[];

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(instance: Users): void {
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = bcrypt.hashSync(instance.password, saltRounds);
    }
  }

  static async assignRole(
    userId: string,
    roleName: RolesEnum,
    transaction?: Transaction,
  ): Promise<void> {
    const role = await Roles.findOne({ where: { name: roleName } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await UserHasRoles.create(
      {
        userId,
        roleId: role.id,
      },
      { ...(transaction && { transaction }) },
    );
  }
}
