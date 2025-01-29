import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { UserRepository } from "#/user/User.repository";
import { JwtService } from "@nestjs/jwt";
import { User } from "@shared/backend";
import { SignInDTO, SignInResponse, RegisterDTO } from "@shared/backend";

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(data: RegisterDTO): Promise<User> {
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
    const token = this.jwtService.sign(payload);
    return {
      token: token,
      email: user.email,
      id: user.id,
    };
  }
}
