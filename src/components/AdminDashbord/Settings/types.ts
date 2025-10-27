
export enum Role {
  SuperAdmin = 'Super Admin',
  ContentManager = 'Content Manager',
  SupportManager = 'Support Manager',
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  lastActive: string;
}

export interface RolePermission {
    name: Role;
    permissions: string[];
}
