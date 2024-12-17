import { InterfaceRepository } from "./Interface.repository";
import PRISMA from "../../prisma";
import { UserDTO ,UserDTOCreate} from "@app/shared/model/UserDTO";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepository implements InterfaceRepository<UserDTO> {
  count(): Promise<number> {
    return PRISMA.user.count();
  }
  findAll(): Promise<UserDTO[]> {
    return PRISMA.user.findMany();
  }
  findOneByEmail(email: string): Promise<UserDTO> {
    return PRISMA.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  findOneById(id: string): Promise<UserDTO> {
    return PRISMA.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }
  createOne(CreateData: UserDTOCreate): Promise<UserDTO> {
    return PRISMA.user.create({
      data: CreateData,
    });
  }
  updateOne(id: string, UpdateData: Partial<UserDTO>): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
  deleteMany(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
