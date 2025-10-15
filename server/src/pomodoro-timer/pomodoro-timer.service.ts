import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { PomodoroSettingsService } from 'src/pomodoro-settings/pomodoro-settings.service'
import {
	PomodoroRoundDTO,
	PomodoroSessionDTO
} from 'src/pomodoro-timer/dto/pomodoro-timer.dto'

@Injectable()
export class PomodoroTimerService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
		private pomodoroSettingsService: PomodoroSettingsService
	) {}

	async getTodaySession(userId: string) {
		const today = new Date().toISOString().split('T')[0]

		return this.prisma.pomodoroSession.findFirst({
			where: {
				createdAt: {
					gte: new Date(today)
				},
				userId
			},
			include: {
				pomodoroRounds: {
					orderBy: { id: 'asc' }
				}
			}
		})
	}

	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId)

		if (todaySession) return todaySession

		const user = this.userService.getByID(userId)

		if (!user) throw new NotFoundException('User not found')

		const pomodoroSettings =
			await this.pomodoroSettingsService.getPomodoroSettingsByUserId(userId)

		return this.prisma.pomodoroSession.create({
			data: {
				pomodoroRounds: {
					createMany: {
						data: Array.from(
							{
								length: pomodoroSettings.intervalsCount
							},
							() => ({
								totalSeconds: 0
							})
						)
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			},
			include: { pomodoroRounds: true }
		})
	}

	async update(
		userId: string,
		pomodoroTimerId: string,
		dto: Partial<PomodoroSessionDTO>
	) {
		return this.prisma.pomodoroSession.update({
			where: {
				id: pomodoroTimerId,
				userId
			},
			data: dto
		})
	}

	async updateRound(roundId: string, dto: Partial<PomodoroRoundDTO>) {
		return this.prisma.pomodoroRound.update({
			where: {
				id: roundId
			},
			data: dto
		})
	}

	async deleteSession(sessionId: string, userId: string) {
		return this.prisma.pomodoroSession.delete({
			where: {
				id: sessionId,
				userId
			}
		})
	}
}
