import { Role, ROLE } from "@shared/backend";

export enum SecurityScope {
  USER_READ = "user.read",
  USER_WRITE = "user.write",
  USER_CURRENT_READ = "user:current.read",
  USER_CURRENT_WRITE = "user:current.write",
  TOKEN_CURRENT = "token:current",
  MISSION_READ = "mission.read",
  MISSION_WRITE = "mission.write",
  ACTIVITY_READ = "activity.read",
  ACTIVITY_WRITE = "activity.write",
  FEEDBACK_READ = "feedback.read",
  FEEDBACK_WRITE = "feedback.write",
  APPRENTICE_READ = "apprentice.read",
}

export const USER_SCOPES: Set<SecurityScope> = new Set<SecurityScope>([
  SecurityScope.USER_CURRENT_READ,
  SecurityScope.USER_CURRENT_WRITE,
  SecurityScope.TOKEN_CURRENT,
]);

export const APPRENTICE_SCOPES: Set<SecurityScope> = new Set<SecurityScope>([
  ...USER_SCOPES,
  SecurityScope.MISSION_READ,
  SecurityScope.ACTIVITY_READ,
  SecurityScope.ACTIVITY_WRITE,
  SecurityScope.FEEDBACK_READ,
]);

export const COMPANY_SCOPES: Set<SecurityScope> = new Set<SecurityScope>([
  ...USER_SCOPES,
  SecurityScope.MISSION_WRITE,
  SecurityScope.MISSION_READ,
  SecurityScope.ACTIVITY_READ,
  SecurityScope.FEEDBACK_WRITE,
  SecurityScope.FEEDBACK_READ,
  SecurityScope.APPRENTICE_READ,
]);

export const ADMIN_SCOPES: Set<SecurityScope> = new Set<SecurityScope>([
  ...USER_SCOPES,
  SecurityScope.USER_READ,
  SecurityScope.USER_WRITE,
]);

export function getScopesBasedOnUserRole(userRole: Role): Set<SecurityScope> {
  if (userRole === ROLE.ADMIN) {
    return ADMIN_SCOPES;
  } else if (userRole === ROLE.COMPANY) {
    return COMPANY_SCOPES;
  } else if (userRole === ROLE.STUDENT) {
    return APPRENTICE_SCOPES;
  }
  return USER_SCOPES;
}
