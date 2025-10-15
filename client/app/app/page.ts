import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export { DashboardPage as default } from '@/pages/dashboard-page'
export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}
