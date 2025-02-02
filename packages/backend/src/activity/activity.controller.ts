import { FeedbackService } from "#/feedback/feedback.service";
import { SkillService } from "#/skill/skill.service";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { Permissions } from "#/auth/decorators/permissions.decorator";
import { SecurityScope } from "#/auth/auth.scope";
import {
  CurrentUserID,
  CurrentUserRole,
} from "#/auth/decorators/current-user.decorator";
import {
  Activity,
  ActivityCreate,
  ActivityCreateRequest,
  ActivityUpdateRequest,
  Feedback,
  FeedbackCreate,
  Mission,
  MissionDetailed,
  ResponseObject,
  ROLE,
  SkillCreate,
} from "@shared/backend";
import { MissionService } from "#/mission/mission.service";

@Controller("api/activity")
export class ActivityController {
  constructor(
    private activityService: ActivityService,
    private missionService: MissionService,
    private feedbackService: FeedbackService,
    private skillService: SkillService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("")
  @Permissions(SecurityScope.ACTIVITY_WRITE)
  async createActivity(
    @CurrentUserID() userId: number,
    @Body() body: ActivityCreateRequest,
  ): Promise<ResponseObject<"activity", Activity>> {
    const activity = await this.activityService.createOne({
      ...body,
      apprenticeId: userId,
    });
    return { activity };
  }

  @HttpCode(HttpStatus.OK)
  @Get("missions")
  @Permissions(SecurityScope.MISSION_READ)
  async getMissions(
    @CurrentUserID() userId: number,
    @CurrentUserRole() role: string,
  ): Promise<ResponseObject<"missions", MissionDetailed[]>> {
    let missions: Mission[] = [];
    if (role === ROLE.STUDENT) {
      missions = (await this.missionService.findAll()).filter(
        (mission) => mission.apprenticeId === userId,
      );
    } else if (role === ROLE.COMPANY) {
      missions = (await this.missionService.findAll()).filter(
        (mission) => mission.companyId === userId,
      );
    }
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
    return { missions: missionsDetailed };
  }

  @HttpCode(HttpStatus.OK)
  @Post("feedback")
  @Permissions(SecurityScope.FEEDBACK_WRITE)
  async createFeedback(
    @CurrentUserID() userId: number,
    @Body() body: FeedbackCreate,
  ): Promise<ResponseObject<"feedback", Feedback>> {
    const feedback = await this.feedbackService.createOne({
      ...body,
    });
    return { feedback };
  }

  @HttpCode(HttpStatus.OK)
  @Put(":id")
  @Permissions(SecurityScope.ACTIVITY_WRITE)
  async updateActivity(
    @Body() body: ActivityUpdateRequest,
    @Param("id") id: string,
  ): Promise<ResponseObject<"activity", Activity>> {
    const activity: Partial<ActivityCreate> = {
      title: body.title,
      description: body.description,
      phase: body.phase,
      missionId: body.missionId,
    };
    let skill: SkillCreate | undefined;
    if (body.skillDescription && body.skillLevel && body.skillType) {
      skill = {
        description: body.skillDescription,
        level: body.skillLevel,
        type: body.skillType,
      };
    }
    const updatedActivity = await this.activityService.updateOne(
      parseInt(id),
      activity,
      skill,
    );
    return { activity: updatedActivity };
  }
}
