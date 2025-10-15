'use client'

import clsx from 'clsx'

import cls from './Sidebar.module.scss'
import { VStack } from '@/shared/ui/Stack'

import { SidebarFooter } from '../sidebar-footer/SidebarFooter'
import { SidebarHeader } from '../sidebar-header/SidebarHeader'
import { SidebarItems } from '../sidebar-items/SidebarItems'

export const Sidebar = () => {
	return (
		<aside className={clsx(cls.Sidebar)}>
			<VStack className={cls.inner}>
				<SidebarHeader />
				<SidebarItems />
				<SidebarFooter />
			</VStack>
		</aside>
	)
}
