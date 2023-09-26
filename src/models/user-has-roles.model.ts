import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Roles } from './roles.model';

@Table({ tableName: 'user_has_roles' })
export class UserHasRoles extends Model {
  @ForeignKey(() => Users)
  @Column(DataType.UUIDV4)
  userId: string;

  @ForeignKey(() => Roles)
  @Column(DataType.UUIDV4)
  roleId: string;
}
