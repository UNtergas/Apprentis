import { FeedbackService } from "#/feedback/feedback.service";
import { SkillService } from "#/skill/skill.service";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { Permissions } from "#/auth/decorators/permissions.decorator";
import { SecurityScope } from "#/auth/auth.scope";
import { CurrentUserID } from "#/auth/decorators/current-user.decorator";
import {
  Activity,
  ActivityCreateRequest,
  ResponseObject,
} from "@shared/backend";

@Controller("api/activity")
export class ActivityController {
  constructor(
    private activityService: ActivityService,
    private feedbackService: FeedbackService,
    private skillService: SkillService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("activity")
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
}
