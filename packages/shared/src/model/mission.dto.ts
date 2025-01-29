import { SkillOnMission } from "./skillOnMission.dto";

export class Mission {
    readonly id : number;
    title : string;
    description : string;
    semester : string;
    apprenticeId : number;
    companyId : number;
    skills : SkillOnMission[];
}

export type MissionCreate = Omit<Mission, 'id'|'skills'>;