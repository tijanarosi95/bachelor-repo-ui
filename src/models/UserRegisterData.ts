import { UserRole } from "./UserRole";

export interface UserRegisterData {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  role: UserRole
}