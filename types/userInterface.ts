export type Role = 'customer' | 'vendor';

export interface IUser {
  full_name: string;
  phone: string;
  role: Role;
  profile_image?: string | null;
  city: string;
  password: string;
}
