import { UserDTO } from "@shared/backend";

declare global {
  namespace Express {
    interface Request {
      securityContext?: {
        user: UserDTO;
      };
    }
  }
}
