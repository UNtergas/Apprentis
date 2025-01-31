import { FeedbackService } from "#/feedback/feedback.service";
import { SkillService } from "#/skill/skill.service";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
  ActivityCreateRequest,
  Feedback,
  FeedbackCreate,
  Mission,
  ResponseObject,
  ROLE,
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
  ): Promise<ResponseObject<"missions", Mission[]>> {
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
    return { missions: missions };
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
}
