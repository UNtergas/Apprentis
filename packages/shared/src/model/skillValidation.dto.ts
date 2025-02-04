import { Level } from "./skill.dto";

export class SkillValidation {
    id : number;
    validatedAt : Date;
    validatedLevel : Level;

    apprenticeId : number;
    validatorId : number;
    skillId : number;
}

export type SkillValidationCreate = Pick <SkillValidation, 'validatedLevel' | 'skillId' | 'apprenticeId'>;