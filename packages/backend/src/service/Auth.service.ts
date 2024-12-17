import { UserDTO } from "@app/shared/model/UserDTO";
import { UserRepository } from "../repository/User.repository";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import UnauthorizedError from "@app/shared/utils/errors/UnauthorizedError";
import ResourceNotFoundError from "@app/shared/utils/errors/ResourceNotFoundError";

interface AuthInterface {
  email: string;
  password: string;
}

interface ResponseInterface {
  token: string;
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: AuthInterface): Promise<ResponseInterface> {
    const user = await this.userRepository.findOneByEmail(data.email);
    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }
    if (user.password !== data.password) {
      throw new UnauthorizedError("Password is incorrect");
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token, email: user.email, id: user.id };
  }
}
