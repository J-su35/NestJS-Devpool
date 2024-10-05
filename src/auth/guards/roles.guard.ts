import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { LoggedInDto } from '../dto/logged-in.dto';

@Injectable()
//last class code
// export class RolesGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // get roles from decorator
    const roles = this.reflector.get(Roles, context.getHandler())

    // if not specific role then allow
    if (!roles) {
      return true;
    }

    // if specific roles then check role
    const request = context.switchToHttp().getRequest();
    const user: LoggedInDto = request.user;

    return roles.includes(user.role);
  }
}
