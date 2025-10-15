import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export { SettingsPage as default } from '@/pages/settings-page'
export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}
