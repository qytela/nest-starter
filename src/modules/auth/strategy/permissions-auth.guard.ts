import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const { roles } = request.user;
    const [mapPermissions]: string[] = roles.map((role) => {
      return role
        .get('permissions')
        .map((permission) => permission.get('name'));
    });

    const some = getPermissions.some((permission) =>
      mapPermissions.includes(permission),
    );

    if (!mapPermissions || !some) {
      throw new UnauthorizedException(
        'User does not have the right permissions',
      );
    }

    return true;
  }
}
