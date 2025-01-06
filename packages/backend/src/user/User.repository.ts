import { InterfaceRepository } from "#/interfaces/Interface.repository";
import PRISMA from "../../prisma";
import { UserDTO, ROLE, RegisterDTO } from "../../../shared/back";
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
  findOneById(id: number): Promise<UserDTO> {
    return PRISMA.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  createOne(CreateData: RegisterDTO): Promise<UserDTO> {
    return PRISMA.user.create({
      data: {
        ...CreateData,
        role: ROLE.STUDENT, // Set default role here// Set default name here
      },
    });
  }
  updateOne(id: number, UpdateData: Partial<UserDTO>): Promise<UserDTO> {
    throw new NotImplementedException("Method not implemented.");
  }
  deleteOne(id: number): Promise<UserDTO> {
    throw new NotImplementedException("Method not implemented.");
  }
  deleteMany(): Promise<void> {
    throw new NotImplementedException("Method not implemented.");
  }
}
