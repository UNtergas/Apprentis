import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { UserRepository } from "#/user/User.repository";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "@app/shared";
import { SignInDTO, SignInResponse, RegisterDTO } from "@app/shared";

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(data: RegisterDTO): Promise<UserDTO> {
    const user = await this.userRepo.findOneByEmail(data.email);
    if (user) {
      throw new ConflictException("User already exists");
    }
    if (!data.password) {
      throw new UnauthorizedException("Password is required");
    }

    return await this.userRepo.createOne(data);
  }

  async signIn(data: SignInDTO): Promise<SignInResponse> {
    const user = await this.userRepo.findOneByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    if (user.password !== data.password) {
      throw new UnauthorizedException("Password is incorrect");
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      token: this.jwtService.sign(payload),
      email: user.email,
      id: user.id,
    };
  }
}
