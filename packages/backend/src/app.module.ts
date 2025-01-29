import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PermissionGuard } from "./guard/permission.guard";
import { ActivitiesService } from './activities/activities.service';
import { ActivitiesController } from './activities/activities.controller';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [AuthModule, ActivitiesModule],
  controllers: [AppController, ActivitiesController],
  providers: [AppService, { provide: "APP_GUARD", useClass: PermissionGuard }, ActivitiesService],
})
export class AppModule {}
