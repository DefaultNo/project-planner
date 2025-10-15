import Link from 'next/link'

import cls from './SidebarItem.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { DashboardSidebarItem } from '../../model/types/sidebar.interface'

interface SidebarItemProps {
	item: DashboardSidebarItem
}

export const SidebarItem = (props: SidebarItemProps) => {
	const { item } = props

	return (
		<Ripple className={cls.SidebarItem} color='var(--primary-color)'>
			<Link className={cls.link} href={item.path}>
				<HStack align='center' gap='8'>
					{item.icon ? <Icon SVG={item.icon} /> : null}
					<Text sx={{ fontSize: 'body-l', fontWeight: '500' }}>
						{item.name}
					</Text>
				</HStack>
			</Link>
		</Ripple>
	)
}
