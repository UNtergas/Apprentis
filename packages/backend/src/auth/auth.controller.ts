import { Controller, HttpCode, Post, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDTO } from "@app/shared/src/model/AuthDTO";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() body: SignInDTO) {
    return await this.authService.signIn(body);
  }
}
