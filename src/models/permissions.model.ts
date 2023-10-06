import { Column, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

export enum PermissionsEnum {
  CREATE_BOOK = 'create-book',
  READ_BOOK = 'read-book',
  UPDATE_BOOK = 'update-book',
  DELETE_BOOK = 'delete-book',
}

@Table({ tableName: 'permissions' })
export class Permissions extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4 })
  id: string;

  @Column
  name: string;

  @Column
  displayName: string;

  @Column
  description: string;

  @Column
  guard: string;
}
