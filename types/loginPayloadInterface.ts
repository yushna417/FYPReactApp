import { Role } from "./userInterface";

export interface ILoginPayload {
  phone: string;
  password: string;
  role: Role;
}
