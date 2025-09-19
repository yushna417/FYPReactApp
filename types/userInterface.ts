export type Role = 'customer' | 'vendor';

export interface IUser {
  full_name: string;
  phone: string;
  role: Role;
  profile_image?: string | null;
  city: string;
  password: string;
  // date_joined: string;
}

export interface UserData {
  full_name: string;
  phone: string;
  role: Role;
  profile_image?: string | null;
  city: string;
  date_joined: string;
}
