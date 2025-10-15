import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export { TimerPage as default } from '@/pages/timer-page'
export const metadata: Metadata = {
	title: 'Timer',
	...NO_INDEX_PAGE
}
