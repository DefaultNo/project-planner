import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export { TimeBlockPage as default } from '@/pages/time-block-page'
export const metadata: Metadata = {
	title: 'Time Block',
	...NO_INDEX_PAGE
}
