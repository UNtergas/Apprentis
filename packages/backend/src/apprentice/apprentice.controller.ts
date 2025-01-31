import { Controller, Get, HttpStatus, HttpCode } from "@nestjs/common";
import { ApprenticeService } from "./apprentice.service";
import { SecurityScope } from "#/auth/auth.scope";
import { Permissions } from "#/auth/decorators/permissions.decorator";
import { CurrentUserID } from "#/auth/decorators/current-user.decorator";
import { ResponseObject, Apprentice } from "@shared/backend";
@Controller("api/apprentice")
export class ApprenticeController {
  constructor(private apprenticeService: ApprenticeService) {}

  @HttpCode(HttpStatus.OK)
  @Get("missions")
  @Permissions(SecurityScope.MISSION_READ)
  async getApprenticeInfo(
    @CurrentUserID() userId: number,
  ): Promise<ResponseObject<"apprentice", Apprentice>> {
    const apprentice = await this.apprenticeService.findOneById(userId);
    return { apprentice };
  }
}
