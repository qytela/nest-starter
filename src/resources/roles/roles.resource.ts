import { Roles } from 'src/models/roles.model';
import { PermissionsCollection } from '../permissions/permissions.collection';

export class RolesResource {
  constructor(data: Roles) {
    return {
      name: data.name,
      displayName: data.displayName,
      ...(data.permissions && {
        permissions: new PermissionsCollection(data.permissions),
      }),
    };
  }
}
