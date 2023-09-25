import { Roles } from 'src/models/roles.model';

export class RolesResource {
  constructor(data: Roles) {
    return {
      name: data.name,
      displayName: data.displayName,
    };
  }
}
