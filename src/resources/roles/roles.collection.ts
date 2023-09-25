import { RolesResource } from './roles.resource';

export class RolesCollection {
  constructor(data: any[]) {
    return data.map((v) => new RolesResource(v));
  }
}
