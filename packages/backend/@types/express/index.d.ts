import { UserDTO } from "@app/shared";

declare global {
  namespace Express {
    interface Request {
      securityContext?: {
        user: UserDTO;
      };
    }
  }
}
