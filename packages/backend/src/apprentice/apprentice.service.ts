import { Injectable } from "@nestjs/common";
import { Apprentice } from "@shared/backend";
import PRISMA from "prisma";
@Injectable()
export class ApprenticeService {
  async findAll(): Promise<Apprentice[]> {
    return PRISMA.user.findMany({
      include: {
        mission_apprentice: {
          include: {
            skills: true,
          },
        },
        activities: {
          include: {
            skills: true,
            feedbacks: true,
          },
        },
        validatedCompetencies: true,
      },
    });
  }

  async findOneById(id: number): Promise<Apprentice> {
    return PRISMA.user.findUnique({
      where: {
        id: id,
      },
      include: {
        mission_apprentice: {
          include: {
            skills: true,
          },
        },
        activities: {
          include: {
            skills: true,
            feedbacks: true,
          },
        },
        validatedCompetencies: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<Apprentice> {
    return PRISMA.user.findUnique({
      where: {
        email: email,
      },
      include: {
        mission_apprentice: {
          include: {
            skills: true,
          },
        },
        activities: {
          include: {
            skills: true,
            feedbacks: true,
          },
        },
        validatedCompetencies: true,
      },
    });
  }
}
