import { $axiosAuth } from '@/shared/api/interceptors'

import { IProfileResponse, UserForm } from '../../types/user'

class UserService {
	private BASE_URL = '/user'
	private UPDATE_URL = `${this.BASE_URL}/update`

	async getProfile() {
		const response = await $axiosAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async update(data: UserForm) {
		const response = await $axiosAuth.put(this.UPDATE_URL, data)
		return response.data
	}
}

export const userService = new UserService()
