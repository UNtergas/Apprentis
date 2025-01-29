import { Feedback } from "./feedback.dto";
import { SkillOnActivity } from "./skillOnActivity.dto";

export class Activity{
    readonly id : number;
    title : string;
    description : string;
    date  : Date;
    apprenticeId : number;
    skills : SkillOnActivity[];
    feedbacks : Feedback[];
}

export type ActivityCreate = Omit<Activity, 'id'|'skills'|'feedbacks'>;