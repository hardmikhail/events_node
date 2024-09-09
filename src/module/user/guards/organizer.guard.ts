import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

<<<<<<< Updated upstream
import { UserRole } from '../../../common/types/entity.enums';

=======
<<<<<<< Updated upstream
// todo: как будто по логике этот guard должен быть в другом модуле
=======
import { UserRole } from '../../../common/types/entity.enums';

>>>>>>> Stashed changes
>>>>>>> Stashed changes
@Injectable()
export class OrganizerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.role === UserRole.ORGANIZER;
  }
}
