import { $axiosAuth } from '@/shared/api/interceptors'

import {
	ITimeBlockResponse,
	TimeBlockFormState
} from '../../types/time-block.types'

class TimeBlockService {
	private BASE_URL = '/user/time-block'

	async getTimeBlocks() {
		return await $axiosAuth.get<ITimeBlockResponse[]>(this.BASE_URL)
	}

	async createTimeBlock(data: TimeBlockFormState) {
		return await $axiosAuth.post(this.BASE_URL, data)
	}

	async updateOrderTimeBlock(ids: string[]) {
		return await $axiosAuth.put(`${this.BASE_URL}/update-order`, {
			ids
		})
	}

	async updateTimeBlock(id: string, data: TimeBlockFormState) {
		return await $axiosAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteTimeBlock(id: string) {
		return await $axiosAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const timeBlockService = new TimeBlockService()
