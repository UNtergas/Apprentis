
export const ROLE ={
  STUDENT: 'STUDENT',
  USER: 'USER',
  ADMIN: 'ADMIN',
  TUTOR: 'TUTOR',
} as const

export type Role = typeof ROLE[keyof typeof ROLE];

export class UserDTO {
  public readonly id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: Role;

  constructor(id: number, name: string, email: string, password: string, role: Role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export type UserDTOCreate = Omit<UserDTO, 'id' | 'name'| 'role'>;