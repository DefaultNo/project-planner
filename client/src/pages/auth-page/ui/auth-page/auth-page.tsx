import { Metadata } from 'next'

import { AuthForm } from '@/features/auth'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export const AuthPage = () => {
	return <AuthForm />
}
