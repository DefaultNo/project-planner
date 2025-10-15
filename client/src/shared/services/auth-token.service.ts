import Cookies from 'js-cookie'

import { Tokens } from '@/shared/constants/tokens.constants'

export const getAccessToken = () => {
	const accessToken = Cookies.get(Tokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveAccessTokenToStorage = (accessToken: string) => {
	Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
		domain: process.env.DOMAIN,
		sameSite: 'strict',
		expires: 1
	})
}

export const removeAccessTokenFromStorage = () => {
	Cookies.remove(Tokens.ACCESS_TOKEN)
}
