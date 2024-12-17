import CustomError from "./CustomError";

class ResourceNotFoundError extends CustomError {
  constructor(message: string) {
    super(404,message);
    this.name = 'ResourceNotFoundError';
  }
}
export default ResourceNotFoundError;