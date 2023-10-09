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
import { UUIDV4, Transaction, Op } from 'sequelize';
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

  public async assignRole(
    role: RolesEnum | RolesEnum[],
    transaction?: Transaction,
  ): Promise<void> {
    const mapRole = !Array.isArray(role) ? [role] : role;
    const getRoles = await Roles.findAll({
      where: {
        name: {
          [Op.in]: mapRole,
        },
      },
    });
    if (getRoles.length === 0) {
      throw new NotFoundException('Role not found');
    }

    const userRoles = getRoles.map((role) => ({
      userId: this.id,
      roleId: role.get('id'),
    }));
    await UserHasRoles.bulkCreate(userRoles, { transaction });
  }
}
