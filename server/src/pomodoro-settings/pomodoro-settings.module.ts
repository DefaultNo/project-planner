import { Module } from '@nestjs/common'
import { PomodoroSettingsService } from './pomodoro-settings.service'
import { PomodoroSettingsController } from './pomodoro-settings.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [PomodoroSettingsController],
	providers: [PomodoroSettingsService, PrismaService]
})
export class PomodoroSettingsModule {}
