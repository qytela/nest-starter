import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Permissions } from './permissions.model';
import { RoleHasPermissions } from './role-has-permissions';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}

@Table({ tableName: 'roles' })
export class Roles extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4 })
  id: string;

  @Column
  name: string;

  @Column
  displayName: string;

  @Column
  guard: string;

  @BelongsToMany(() => Permissions, () => RoleHasPermissions, 'roleId')
  permissions: Permissions[];
}
