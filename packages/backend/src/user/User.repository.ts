import { InterfaceRepository } from "#/interfaces/Interface.repository";
import PRISMA from "../../prisma";
import { UserDTO, UserDTOCreate, ROLE } from "@app/shared/src/model/UserDTO";
import { Injectable, NotImplementedException } from "@nestjs/common";

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
      data: {
        ...CreateData,
        role: ROLE.STUDENT, // Set default role here
        name: "Default Name", // Set default name here
      },
    });
  }
  updateOne(id: string, UpdateData: Partial<UserDTO>): Promise<UserDTO> {
    throw new NotImplementedException("Method not implemented.");
  }
  deleteOne(id: string): Promise<UserDTO> {
    throw new NotImplementedException("Method not implemented.");
  }
  deleteMany(): Promise<void> {
    throw new NotImplementedException("Method not implemented.");
  }
}
