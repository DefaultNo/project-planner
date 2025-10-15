import { AppRoutes } from '@/shared/config/pages-url.config'
import { PagesNames } from '@/shared/constants/pages.constants'

export const titlesData: Record<string, PagesNames> = {
	[AppRoutes.HOME]: PagesNames.DASHBOARD,
	[AppRoutes.TASKS]: PagesNames.TASKS,
	[AppRoutes.SETTINGS]: PagesNames.SETTINGS
}
