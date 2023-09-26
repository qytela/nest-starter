import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const { roles } = request.user;
    const mapRoles = roles.map((role) => role.get('name'));

    if (!mapRoles || !mapRoles.some((role) => getRoles.includes(role))) {
      throw new UnauthorizedException('User does not have the right roles');
    }

    return true;
  }
}
