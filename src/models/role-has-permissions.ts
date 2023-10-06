import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Roles } from './roles.model';
import { Permissions } from './permissions.model';

@Table({ tableName: 'role_has_permissions' })
export class RoleHasPermissions extends Model {
  @ForeignKey(() => Roles)
  @Column(DataType.UUIDV4)
  roleId: string;

  @ForeignKey(() => Permissions)
  @Column(DataType.UUIDV4)
  permissionId: string;
}
