import { Controller, Get, HttpStatus, HttpCode, Query } from "@nestjs/common";
import { ApprenticeService } from "./apprentice.service";
import { SecurityScope } from "#/auth/auth.scope";
import { Permissions } from "#/auth/decorators/permissions.decorator";
import { CurrentUserID } from "#/auth/decorators/current-user.decorator";
import {
  ResponseObject,
  Apprentice,
  MissionDetailed,
  Mission,
  Activity,
  ApprenticeDetailed,
} from "@shared/backend";
import { MissionService } from "#/mission/mission.service";
import { SkillService } from "#/skill/skill.service";

@Controller("api/apprentice")
export class ApprenticeController {
  constructor(
    private apprenticeService: ApprenticeService,
    private missionService: MissionService,
    private skillService: SkillService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get("")
  @Permissions(SecurityScope.MISSION_READ)
  async getApprenticeInfo(
    @CurrentUserID() userId: number,
  ): Promise<ResponseObject<"apprentice", Apprentice>> {
    const apprentice = await this.apprenticeService.findOneById(userId);
    return { apprentice };
  }

  @HttpCode(HttpStatus.OK)
  @Get("emails")
  @Permissions(SecurityScope.APPRENTICE_READ)
  async getApprenticesEmails(
    @Query("email") email: string,
  ): Promise<ResponseObject<"emails", string[]>> {
    const apprentices = await this.apprenticeService.findManyBySearch(email);
    const emails = apprentices.map((apprentice) => apprentice.email);
    return { emails };
  }

  @HttpCode(HttpStatus.OK)
  @Get("mission")
  @Permissions(SecurityScope.APPRENTICE_READ)
  async getApprenticesByMission(
    @CurrentUserID() userId: number,
  ): Promise<ResponseObject<"apprentices", ApprenticeDetailed[]>> {
    const missions = (await this.missionService.findAll()).filter(
      (mission) => mission.companyId === userId,
    );
    const allSkills = await this.skillService.findAll();
    const missionsDetailed: MissionDetailed[] = missions.map(
      (mission: Mission) => ({
        ...mission,
        activitiesDetailed: mission.activities.map((activity: Activity) => ({
          ...activity,
          skillsDetailed: allSkills.filter((skill) =>
            activity.skills.some(
              (activitySkill) => activitySkill.skillId === skill.id,
            ),
          ),
        })),
      }),
    );
    const companyMap = new Map(
      missions.map((mission) => [mission.id, mission.companyId]),
    );
    const apprentices = (await this.apprenticeService.findAll()).filter(
      (apprentice) =>
        apprentice.mission_apprentice.some((mission) =>
          companyMap.has(mission.id),
        ),
    );
    const apprenticeByMission = apprentices.map((apprentice) => ({
      ...apprentice,
      mission_apprenticeDetailed: missionsDetailed.filter((mission) =>
        apprentice.mission_apprentice.some(
          (apprenticeMission) => apprenticeMission.id === mission.id,
        ),
      ),
    }));
    return { apprentices: apprenticeByMission };
  }
}
