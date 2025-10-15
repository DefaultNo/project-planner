import cls from './SidebarItems.module.scss'
import { VStack } from '@/shared/ui/Stack'

import { DashboardSidebarNavigationData } from '../../model/data/sidebar.data'
import { SidebarItem } from '../../ui/sidebar-item/SidebarItem'

export const SidebarItems = () => {
	return (
		<VStack gap='4' flexGrow={1} className={cls.SidebarItems}>
			{DashboardSidebarNavigationData.map(item => (
				<SidebarItem key={item.path} item={item} />
			))}
		</VStack>
	)
}
