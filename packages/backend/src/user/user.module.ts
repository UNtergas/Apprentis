import { Module } from "@nestjs/common";
import { UserController } from "#/user/User.controller";
import { UserRepository } from "#/user/User.repository";

@Module({
  controllers: [UserController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
