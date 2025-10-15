import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDTO } from 'src/tasks/dto/task.dto'

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({ where: { userId } })
	}

	async create(userId: string, dto: TaskDTO) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(userId: string, taskId: string, dto: Partial<TaskDTO>) {
		return this.prisma.task.update({
			where: { id: taskId, userId },
			data: dto
		})
	}

	async delete(taskId: string) {
		return this.prisma.task.delete({
			where: { id: taskId }
		})
	}

	async getCompletedTasks(id: string) {
		return this.prisma.task.count({
			where: { userId: id, isCompleted: true }
		})
	}

	async getTasksByDate(id: string, date: Date) {
		return this.prisma.task.count({
			where: { userId: id, createdAt: { gte: date.toISOString() } }
		})
	}
}
