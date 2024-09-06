import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/config/types/entity.enums';

// todo: как будто по логике этот guard должен быть в другом модуле
@Injectable()
export class OrganizerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.role === UserRole.ORGANIZER;
  }
}
