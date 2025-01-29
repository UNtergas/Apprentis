import { UserRepository } from "#/user/User.repository";
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Permissions } from "#/auth/decorators/permissions.decorator";
import { PermissionGuard } from "#/guard/permission.guard";
import { SecurityScope } from "#/auth/auth.scope";
import { Request } from "express";
import { ResponseObject, User } from "@shared/backend";
import { ApiBody } from "@nestjs/swagger";

@Controller("api/user")
@UseGuards(PermissionGuard)
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @HttpCode(HttpStatus.OK)
  @Get("me")
  @Permissions(SecurityScope.USER_CURRENT_READ)
  @ApiBody({ type: User })
  async getMe(@Req() request: Request): Promise<ResponseObject<"user", User>> {
    const user = await this.userRepository.findOneById(
      request.securityContext.user.id,
    );
    return { user };
  }

  ////////////////
  // Admin routes
  @HttpCode(HttpStatus.OK)
  @Get("all")
  @Permissions(SecurityScope.USER_READ)
  @ApiBody({ type: User })
  async getAll(): Promise<
    ResponseObject<"users", User[]> & ResponseObject<"usersCount", number>
  > {
    const users = await this.userRepository.findAll();
    const usersCount = await this.userRepository.count();
    return { users, usersCount };
  }
}
