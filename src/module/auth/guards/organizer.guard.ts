import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/config/types/entity.enums';

@Injectable()
export class OrganizerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.role === UserRole.ORGANIZER;
  }
}
