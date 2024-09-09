import { UserRole } from 'src/common/types/entity.enums';

export type Payload = {
  id: number;
  role: UserRole;
};
