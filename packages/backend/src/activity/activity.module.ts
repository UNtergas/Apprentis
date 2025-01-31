import { Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";
import { FeedbackService } from "#/feedback/feedback.service";
import { SkillService } from "#/skill/skill.service";
import { MissionService } from "#/mission/mission.service";

@Module({
  providers: [ActivityService, FeedbackService, SkillService, MissionService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}
