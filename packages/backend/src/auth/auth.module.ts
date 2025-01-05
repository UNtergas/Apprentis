import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "#/config/jwtConfig";
import { UserModule } from "#/user/user.module";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConfig.SECRET,
      signOptions: { expiresIn: jwtConfig.EXPIRE },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
