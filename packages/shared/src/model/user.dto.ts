import { ApiProperty , ApiBody } from '@nestjs/swagger';
import { Mission } from './mission.dto';
import { Activity } from './activity.dto';
import { Feedback } from './feedback.dto';
import { SkillValidation } from './skillValidation.dto';

export const ROLE ={
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY',
  ADMIN: 'ADMIN',
  TUTOR: 'TUTOR',
} as const

export type Role = typeof ROLE[keyof typeof ROLE];

export class User {
  readonly id: number;
  name: string;
  email: string;
  password: string;
  role: Role;

  // mission_apprentice: Mission[];
  // mission_company: Mission[];

  // activities: Activity[];
  // feedbacks: Feedback[];
  // validatedCompetencies: SkillValidation[];
  // validatorCompetencies: SkillValidation[];

  // tutorId: number;
  // // apprentices: User[];
}

export class Apprentice extends User {
  tutorId: number;
  mission_apprentice: Mission[];
  activities: Activity[];
  validatedCompetencies: SkillValidation[];
}

export class Company extends User {
  mission_company: Mission[];
  feedbacks: Feedback[];
}

export class Tutor extends User {
  apprentices: Apprentice[];
  validatorCompetencies: SkillValidation[];
  feedbacks: Feedback[];
}

