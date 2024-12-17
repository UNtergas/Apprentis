import { Injectable } from "@nestjs/common";
import { UserDTO } from "@app/shared/model/UserDTO";

@Injectable()
export class UserService {
  createUser(user: UserDTO) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
}
