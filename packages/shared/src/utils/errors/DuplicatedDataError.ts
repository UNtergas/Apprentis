import CustomError from "./CustomError";

class DuplicatedDataError extends CustomError {
  constructor(message: string) {
    super(409,message);
    this.name = 'DuplicatedDataError';
  }
}
export default DuplicatedDataError;