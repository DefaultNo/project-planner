import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export { TasksPage as default } from '@/pages/tasks-page'
export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}
