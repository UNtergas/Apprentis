import { Role, ROLE } from "../../../shared/back";

export enum SecurityScope {
  USER_READ = "user.read",
  USER_WRITE = "user.write",
  USER_CURRENT_READ = "user:current.read",
  USER_CURRENT_WRITE = "user:current.write",
  TOKEN_CURRENT = "token:current",
}

export const USER_SCOPES: Set<SecurityScope> = new Set<SecurityScope>([
  SecurityScope.USER_CURRENT_READ,
  SecurityScope.USER_CURRENT_WRITE,
  SecurityScope.TOKEN_CURRENT,
]);

export const ADMIN_SCOPES: Set<SecurityScope> = new Set<SecurityScope>([
  ...USER_SCOPES,
  SecurityScope.USER_READ,
  SecurityScope.USER_WRITE,
]);

export function getScopesBasedOnUserRole(userRole: Role): Set<SecurityScope> {
  if (userRole === ROLE.ADMIN) {
    return ADMIN_SCOPES;
  }
  return USER_SCOPES;
}
