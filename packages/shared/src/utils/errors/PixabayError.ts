import CustomError from "./CustomError";

class PixabayError extends CustomError{
    constructor(message: string) {
        super(400,message);
    }
}

export default PixabayError;