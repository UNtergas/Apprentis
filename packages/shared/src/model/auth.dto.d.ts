export interface SignInResponse {
    token: string;
    email: string;
    id: number;
}
export declare class SignInDTO {
    email: string;
    password: string;
}
export declare class RegisterDTO extends SignInDTO {
    name: string;
}
