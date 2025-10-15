import { $axiosAuth } from '@/shared/api/interceptors'

import {
	IPomodoroSessionResponse,
	PomodoroForm,
	PomodoroRoundState,
	PomodoroSessionState
} from '../../types/pomodoro.types'

class PomodoroService {
	private BASE_URL = '/user/timer'
	private SETTINGS_URL = `/pomodoro-settings`
	private UPDATE_SETTINGS_URL = `${this.SETTINGS_URL}/update`
	private TODAY_SESSION_URL = `${this.BASE_URL}/today`
	private ROUND_URL = `${this.BASE_URL}/round`

	async getTodaySession() {
		return await $axiosAuth.get<IPomodoroSessionResponse>(
			this.TODAY_SESSION_URL
		)
	}

	async createSession() {
		return await $axiosAuth.post<IPomodoroSessionResponse>(this.BASE_URL)
	}

	async updateSession(id: string, data: PomodoroSessionState) {
		return await $axiosAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteSession(id: string) {
		return await $axiosAuth.delete(`${this.BASE_URL}/${id}`)
	}

	async updateRound(id: string, data: PomodoroRoundState) {
		return await $axiosAuth.put(`${this.ROUND_URL}/${id}`, data)
	}

	async getSettings() {
		const response = await $axiosAuth.get<PomodoroForm>(this.SETTINGS_URL)
		return response.data
	}

	async updateSettings(data: PomodoroForm) {
		return await $axiosAuth.put(this.UPDATE_SETTINGS_URL, data)
	}
}

export const pomodoroService = new PomodoroService()
