export type SignInResponse = {
    token: string;
    email: string;
    id: number;
};

export type SignUpResponse = {
    userEmail: string;
};

export type AuthResponse = SignInResponse | SignUpResponse;