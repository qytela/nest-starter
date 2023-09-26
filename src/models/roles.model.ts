import { Column, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

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
}
