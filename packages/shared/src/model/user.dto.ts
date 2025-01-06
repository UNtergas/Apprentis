import { ApiProperty , ApiBody } from '@nestjs/swagger';

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
}



