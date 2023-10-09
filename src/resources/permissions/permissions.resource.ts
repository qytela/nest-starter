import { Permissions } from 'src/models/permissions.model';

export class PermissionsResource {
  constructor(data: Permissions) {
    return {
      id: data.id,
      name: data.name,
      displayName: data.displayName,
    };
  }
}
