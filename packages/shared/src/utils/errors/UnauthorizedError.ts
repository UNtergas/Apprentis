import CustomError from "./CustomError";

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(401,message);
    this.name = 'UnauthorizedError';
  }
}
export default UnauthorizedError;