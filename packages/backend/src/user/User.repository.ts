import PRISMA from "../../prisma";
import { User, ROLE, RegisterDTO } from "@shared/backend";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  async count(): Promise<number> {
    return PRISMA.user.count();
  }

  async findAll(): Promise<User[]> {
    return PRISMA.user.findMany();
  }
  async findOneByEmail(email: string): Promise<User> {
    return PRISMA.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findOneById(id: number): Promise<User> {
    return PRISMA.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  async createOne(CreateData: RegisterDTO): Promise<User> {
    return PRISMA.user.create({
      data: {
        ...CreateData,
        role: ROLE.STUDENT,
      },
    });
  }
  // updateOne(id: number, UpdateData: Partial<User>): Promise<User> {
  //   throw new NotImplementedException("Method not implemented.");
  // }
  // deleteOne(id: number): Promise<User> {
  //   throw new NotImplementedException("Method not implemented.");
  // }
  // deleteMany(): Promise<void> {
  //   throw new NotImplementedException("Method not implemented.");
  // }
}
