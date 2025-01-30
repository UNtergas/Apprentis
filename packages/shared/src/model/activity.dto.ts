import { Feedback } from "./feedback.dto";
import { SkillOnActivity } from "./skillOnActivity.dto";


export const PHASE = {
    STUDY: 'STUDY',
    ACTION: 'ACTION',
    IMPROVEMENT: 'IMPROVEMENT'
} as const

export type Phase = typeof PHASE[keyof typeof PHASE];

export class Activity{
    readonly id : number;
    title : string;
    description : string;
    date  : Date;
    phase : Phase;
    apprenticeId : number;
    skills : SkillOnActivity[];
    feedbacks : Feedback[];
}

export type ActivityCreate = Omit<Activity, 'id'|'skills'|'feedbacks'>;

export type ActivityCreateRequest = Omit<Activity, 'id'|'skills'|'feedbacks'|'apprenticeId'>;