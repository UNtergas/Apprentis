import { Controller, HttpCode, Post, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  UserDTO,
  ResponseObject,
  SignInResponse,
  RegisterDTO,
} from "@app/shared";
import { RestSignInDTO as SignInDTO } from "#/dto/auth.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiBody({ type: SignInDTO })
  async signIn(
    @Body() body: SignInDTO,
  ): Promise<ResponseObject<"signIn", SignInResponse>> {
    const signIn = await this.authService.signIn(body);
    return { signIn };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  @ApiBody({ type: RegisterDTO })
  async signUp(
    @Body() body: RegisterDTO,
  ): Promise<ResponseObject<"signUp", UserDTO>> {
    const signUp = await this.authService.signUp(body);
    return { signUp };
  }
}
