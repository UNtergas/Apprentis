export class Feedback {
    readonly id : number;
    content : string;
    createdAt: Date;
    senderId : number;
    activityId : number;
}

export type FeedbackCreate = Omit<Feedback, 'id'|'createdAt'>;