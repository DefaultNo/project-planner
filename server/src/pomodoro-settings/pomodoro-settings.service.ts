import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroSettingsDTO } from 'src/pomodoro-settings/dto/pomodoro-settings.dto'

@Injectable()
export class PomodoroSettingsService {
	constructor(private prisma: PrismaService) {}

	getByUserID(userId: string) {
		return this.prisma.userPomodoroSettings.findFirst({
			where: { userId }
		})
	}

	async create(userId: string) {
		const pomodoroSettings = {
			userId,
			workInterval: 50,
			breakInterval: 10,
			intervalsCount: 7
		}

		return this.prisma.userPomodoroSettings.create({
			data: pomodoroSettings
		})
	}

	async update(userId: string, dto: PomodoroSettingsDTO) {
		const existingPomodoroSettings =
			await this.prisma.userPomodoroSettings.findFirst({
				where: { userId }
			})

		return this.prisma.userPomodoroSettings.update({
			where: { id: existingPomodoroSettings.id },
			data: dto
		})
	}

	async getPomodoroSettingsByUserId(userId: string) {
		return this.prisma.userPomodoroSettings.findFirst({
			where: {
				userId
			}
		})
	}
}
