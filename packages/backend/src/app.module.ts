import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PermissionGuard } from "./guard/permission.guard";
import { ApprenticeController } from "./apprentice/apprentice.controller";
import { ApprenticeService } from "./apprentice/apprentice.service";
import { ApprenticeModule } from "./apprentice/apprentice.module";
import { MissionController } from './mission/mission.controller';
import { MissionService } from './mission/mission.service';
import { MissionModule } from './mission/mission.module';
import { ActivityController } from './activity/activity.controller';
import { ActivityService } from './activity/activity.service';
import { ActivityModule } from './activity/activity.module';
import { FeedbackService } from './feedback/feedback.service';
import { SkillService } from './skill/skill.service';

@Module({
  imports: [AuthModule, ApprenticeModule, MissionModule, ActivityModule],
  controllers: [AppController, ApprenticeController, MissionController, ActivityController],
  providers: [
    AppService,
    { provide: "APP_GUARD", useClass: PermissionGuard },
    ApprenticeService,
    MissionService,
    ActivityService,
    FeedbackService,
    SkillService,
  ],
})
export class AppModule {}
