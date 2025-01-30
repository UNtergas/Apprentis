import { Module } from "@nestjs/common";
import { UserController } from "#/user/User.controller";
import { UserRepository } from "#/user/User.repository";
import { AuthService } from "#/auth/auth.service";

@Module({
  controllers: [UserController],
  providers: [UserRepository, AuthService],
  exports: [UserRepository],
})
export class UserModule {}
