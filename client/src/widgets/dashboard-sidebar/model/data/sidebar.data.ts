import HomeIcon from '@/shared/assets/icons/Home.svg'
import SettingsIcon from '@/shared/assets/icons/Settings.svg'
import TasksIcon from '@/shared/assets/icons/Tasks.svg'
import TimeBlockingIcon from '@/shared/assets/icons/TimeBlocking.svg'
import TimerIcon from '@/shared/assets/icons/Timer.svg'
import { AppRoutes } from '@/shared/config/pages-url.config'

import { DashboardSidebarItem } from '../types/sidebar.interface'

export const DashboardSidebarNavigationData: DashboardSidebarItem[] = [
	{
		name: 'Dashboard',
		path: AppRoutes.HOME,
		icon: HomeIcon
	},
	{
		name: 'Tasks',
		path: AppRoutes.TASKS,
		icon: TasksIcon
	},
	{
		name: 'Pomodoro Timer',
		path: AppRoutes.TIMER,
		icon: TimerIcon
	},
	{
		name: 'Time Blocking',
		path: AppRoutes.TIME_BLOCKING,
		icon: TimeBlockingIcon
	},
	{
		name: 'Settings',
		path: AppRoutes.SETTINGS,
		icon: SettingsIcon
	}
]
