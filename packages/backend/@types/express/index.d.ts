import { UserDTO } from "../../../shared/back";

declare global {
  namespace Express {
    interface Request {
      securityContext?: {
        user: UserDTO;
      };
    }
  }
}
