import {
  createParamDecorator,
  ExecutionContext,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

type TType = 'roles' | 'permissions';

export const UserAccess = createParamDecorator(
  async (
    type: TType,
    context: ExecutionContext,
  ): Promise<PipeTransform<any>[]> => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException(Object.keys(this)[0]);
    }

    let roles = [];
    let permissions = [];

    if (!type) return user;

    if (type === 'roles') {
      user.roles.map((role) => {
        const id = role.get('id');
        const name = role.get('name');
        roles.push({ id, name });
      });

      return roles;
    }

    if (type === 'permissions') {
      user.roles.map((role) => {
        role.permissions.map((permission) => {
          const id = permission.get('id');
          const name = permission.get('name');
          permissions.push({ id, name });
        });
      });

      return permissions;
    }
  },
);
