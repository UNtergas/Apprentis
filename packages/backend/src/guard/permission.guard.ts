import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PERMISSIONS_KEY } from "#/auth/decorators/permissions.decorator";
import { getScopesBasedOnUserRole, SecurityScope } from "#/auth/auth.scope";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<SecurityScope[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }
    try {
      const payload = this.jwtService.verify(token);
      request.securityContext = {
        user: { id: payload.sub, email: payload.email, role: payload.role },
      };
      if (!permissions) {
        return true;
      }
      const scopes = getScopesBasedOnUserRole(payload.role);
      const hasPermission = permissions.every((permission) =>
        scopes.has(permission),
      );
      if (!hasPermission) {
        throw new ForbiddenException("Insufficient permissions");
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
