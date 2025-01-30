import { Module } from "@nestjs/common";
import { ApprenticeService } from "./apprentice.service";
import { ApprenticeController } from "./apprentice.controller";

@Module({
  providers: [ApprenticeService],
  controllers: [ApprenticeController],
  exports: [ApprenticeService],
})
export class ApprenticeModule {}
