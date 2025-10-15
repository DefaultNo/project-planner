import Image from 'next/image'
import Link from 'next/link'

import cls from './SidebarHeader.module.scss'
import logoUrl from '@/shared/assets/Logo.svg?url'
import { AppRoutes } from '@/shared/config/pages-url.config'
import { HStack } from '@/shared/ui/Stack'

export const SidebarHeader = () => {
	return (
		<HStack className={cls.SidebarHeader}>
			<Link href={AppRoutes.HOME}>
				<Image src={logoUrl} alt='PlannerApp' />
			</Link>
		</HStack>
	)
}
