import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

import { authMiddleware } from '@/features/auth'

export default async function middleware(
	request: NextRequest,
	response: NextResponse
) {
	return await authMiddleware(request, response)
}

export const config: MiddlewareConfig = {
	matcher: [`/app/:path*`, `/auth`]
}
