import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TasksService } from 'src/tasks/tasks.service'
import { PomodoroSettingsService } from 'src/pomodoro-settings/pomodoro-settings.service'

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		PrismaService,
		TasksService,
		PomodoroSettingsService
	],
	exports: [UserService]
})
export class UserModule {}
