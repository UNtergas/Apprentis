export declare const ROLE: {
    readonly STUDENT: "STUDENT";
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly TUTOR: "TUTOR";
};
export type Role = typeof ROLE[keyof typeof ROLE];
export declare class UserDTO {
    readonly id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}
