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
<<<<<<<< HEAD:packages/shared/src/model/user.dto.ts
========

export type UserDTOCreate = Omit<UserDTO, 'id' | 'name'| 'role'>;
>>>>>>>> 227a16391506066d9cfe85a2b1534293d7d9a73e:packages/shared/src/model/UserDTO.ts
