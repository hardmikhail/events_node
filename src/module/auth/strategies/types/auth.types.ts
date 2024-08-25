import { UserRole } from 'src/config/types/entity.enums';

export type Payload = {
  id: number;
  role: UserRole;
};
