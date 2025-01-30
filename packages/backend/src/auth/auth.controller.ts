import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  User,
  ResponseObject,
  SignInResponse,
  RegisterDTO,
  SignInDTO,
} from "@shared/backend";

import { ApiBody } from "@nestjs/swagger";
import { Response } from "express";
import { CONFIG } from "#/env.config";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiBody({ type: SignInDTO })
  async signIn(
    @Body() body: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseObject<"signIn", SignInResponse>> {
    const signIn = await this.authService.signIn(body);
    res.cookie("jwt", signIn.token, {
      httpOnly: true,
      maxAge: CONFIG.COOKIE_EXPIRE,
    });
    return { signIn };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  @ApiBody({ type: RegisterDTO })
  async signUp(
    @Body() body: RegisterDTO,
  ): Promise<ResponseObject<"signUp", User>> {
    const signUp = await this.authService.signUp(body);
    return { signUp };
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async signOut(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseObject<"signOut", string>> {
    res.clearCookie("jwt");
    return { signOut: "Signout Successfully" };
  }
}
