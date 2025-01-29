import PRISMA from "../../prisma";
import { Injectable } from "@nestjs/common";
import { Activity, ActivityCreate } from "@shared/backend";

@Injectable()
export class ActivityService {
  async count(): Promise<number> {
    return PRISMA.activity.count();
  }

  async findAll(): Promise<Activity[]> {
    return PRISMA.activity.findMany({
      include: {
        skills: true,
        feedbacks: true,
      },
    });
  }

  async findOneById(id: number): Promise<Activity> {
    return PRISMA.activity.findUnique({
      where: {
        id: id,
      },
      include: {
        skills: true,
        feedbacks: true,
      },
    });
  }

  async createOne(activityCreationData: ActivityCreate): Promise<Activity> {
    return PRISMA.activity.create({
      data: {
        ...activityCreationData,
      },
      include: {
        skills: true,
        feedbacks: true,
      },
    });
  }
}
