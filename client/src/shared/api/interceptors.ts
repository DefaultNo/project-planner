import axios, { CreateAxiosDefaults } from 'axios'

import { authService } from '@/features/auth'
import { errorCatch } from '@/shared/api/error'
import {
	getAccessToken,
	removeAccessTokenFromStorage
} from '@/shared/services/auth-token.service'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4000/api',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
}

const $axiosBase = axios.create(options)
const $axiosAuth = axios.create(options)

$axiosAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

$axiosAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status == 401 ||
			errorCatch(error) === 'jwt expired' ||
			(errorCatch(error) === 'jwt must be provided' &&
				error.config &&
				!error.config._isRetry)
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return $axiosAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeAccessTokenFromStorage()
			}
		}

		throw error
	}
)

export { $axiosBase, $axiosAuth }
