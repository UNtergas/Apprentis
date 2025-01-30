import { Activity } from "./activity.dto";
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

export type MissionCreateRequest = Omit<Mission, 'id' | 'skills' | 'apprenticeId'> & {
    apprenticeEmail: string;
};

export type MissonWithActivities = Mission & {
    activities: Activity[];
}

export type MissionGETResponse = MissonWithActivities[];
