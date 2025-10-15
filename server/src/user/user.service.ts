import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { hash } from 'argon2'
import { startOfDay, subDays } from 'date-fns'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { UserDTO } from 'src/user/dto/user.dto'
import { TasksService } from 'src/tasks/tasks.service'
import { PomodoroSettingsService } from 'src/pomodoro-settings/pomodoro-settings.service'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private tasks: TasksService,
		private pomodoroSettings: PomodoroSettingsService
	) {}

	async create(dto: AuthDto) {
		const user = {
			name: '',
			email: dto.email,
			password: await hash(dto.password)
		}

		const createdUser = await this.prisma.user.create({
			data: user
		})

		await this.pomodoroSettings.create(createdUser.id)

		return createdUser
	}

	async update(id: string, dto: UserDTO) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: { id },
			data,
			select: {
				name: true,
				email: true
			}
		})
	}

	getByID(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: { tasks: true }
		})
	}

	async getUserWithStatistics(id: string) {
		const user = await this.getByID(id)

		const totalTasks = user.tasks.length
		const completedTasks = await this.tasks.getCompletedTasks(id)

		const todayStart = startOfDay(new Date())
		const weekStart = startOfDay(subDays(new Date(), 7))

		const todayTasks = await this.tasks.getTasksByDate(id, todayStart)
		const weekTasks = await this.tasks.getTasksByDate(id, weekStart)

		const { password, ...other } = user

		return {
			user: other,
			statistics: [
				{ label: 'Total', value: totalTasks },
				{ label: 'Completed tasks', value: completedTasks },
				{ label: 'Today tasks', value: todayTasks },
				{ label: 'Week tasks', value: weekTasks }
			]
		}
	}

	getByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}
}
