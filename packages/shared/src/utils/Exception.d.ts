export declare class APIException extends Error {
    message: string;
    code: number;
    error: string;
    constructor(code: number, error: string, message: string);
}
