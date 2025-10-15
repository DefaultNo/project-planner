import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { TasksService } from 'src/tasks/tasks.service'
import { PomodoroTimerService } from './pomodoro-timer.service'
import { PomodoroTimerController } from './pomodoro-timer.controller'
import { PomodoroSettingsService } from 'src/pomodoro-settings/pomodoro-settings.service'

@Module({
	controllers: [PomodoroTimerController],
	providers: [
		PomodoroTimerService,
		PomodoroSettingsService,
		PrismaService,
		UserService,
		TasksService
	]
})
export class PomodoroTimerModule {}
