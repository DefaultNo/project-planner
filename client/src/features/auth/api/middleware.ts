import { NextRequest, NextResponse } from 'next/server'

import { AppRoutes } from '@/shared/config/pages-url.config'
import { Tokens } from '@/shared/constants/tokens.constants'

export async function authMiddleware(
	request: NextRequest,
	response: NextResponse
) {
	const { url, cookies } = request

	const refreshToken = cookies.get(Tokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.includes(AppRoutes.AUTH)

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(AppRoutes.HOME, url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(AppRoutes.AUTH, url))
	}

	return NextResponse.next()
}
