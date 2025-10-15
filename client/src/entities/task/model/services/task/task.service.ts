import { $axiosAuth } from '@/shared/api/interceptors'

import { ITaskResponse, TaskFormState } from '../../types/task.types'

class TaskService {
	private BASE_URL = '/user/tasks'

	async getTasks() {
		return await $axiosAuth.get<ITaskResponse[]>(this.BASE_URL)
	}

	async createTask(data: TaskFormState) {
		return await $axiosAuth.post(this.BASE_URL, data)
	}

	async updateTask(id: string | number, data: TaskFormState) {
		return await $axiosAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteTask(id: string | number) {
		return await $axiosAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const taskService = new TaskService()
