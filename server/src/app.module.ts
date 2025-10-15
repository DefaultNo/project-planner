import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroTimerModule } from './pomodoro-timer/pomodoro-timer.module';
import { PomodoroSettingsModule } from './pomodoro-settings/pomodoro-settings.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, TasksModule, TimeBlockModule, PomodoroTimerModule, PomodoroSettingsModule]
})
export class AppModule {}
