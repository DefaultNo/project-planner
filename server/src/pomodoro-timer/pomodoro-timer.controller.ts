import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import {
	PomodoroRoundDTO,
	PomodoroSessionDTO
} from 'src/pomodoro-timer/dto/pomodoro-timer.dto'
import { PomodoroTimerService } from './pomodoro-timer.service'

@Controller('user/timer')
export class PomodoroTimerController {
	constructor(private readonly pomodoroTimerService: PomodoroTimerService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroTimerService.getTodaySession(userId)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroTimerService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
		@Body() dto: PomodoroSessionDTO
	) {
		return this.pomodoroTimerService.update(userId, id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('round/:id')
	@Auth()
	async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDTO) {
		return this.pomodoroTimerService.updateRound(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteSession(
		@Param('id') id: string,
		@CurrentUser('id') userId: string
	) {
		return this.pomodoroTimerService.deleteSession(id, userId)
	}
}
