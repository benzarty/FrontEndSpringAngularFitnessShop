import { Role } from './Role';

export class User {
  userName?: String;
  userFirstName?: string;
  userLastName?: string;
  userPassword?: string;
  oldpassword?: string;

  phone?: string;
  active?: boolean;
  email?: string;
  fileName?: string;
  role?: Role[];
}
