import { Permissions } from 'src/models/permissions.model';
import { PermissionsResource } from './permissions.resource';

export class PermissionsCollection {
  constructor(data: Permissions[]) {
    return data.map((v) => new PermissionsResource(v));
  }
}
