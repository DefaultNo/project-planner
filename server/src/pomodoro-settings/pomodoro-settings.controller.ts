import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PomodoroSettingsService } from './pomodoro-settings.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PomodoroSettingsDTO } from 'src/pomodoro-settings/dto/pomodoro-settings.dto'

@Controller('pomodoro-settings')
export class PomodoroSettingsController {
	constructor(
		private readonly pomodoroSettingsService: PomodoroSettingsService
	) {}

	@Get('')
	@Auth()
	async userPomodoroSettings(@CurrentUser('id') id: string) {
		return this.pomodoroSettingsService.getByUserID(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update')
	@Auth()
	async updateSettings(
		@CurrentUser('id') id: string,
		@Body() dto: PomodoroSettingsDTO
	) {
		return this.pomodoroSettingsService.update(id, dto)
	}
}
