'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import cls from './DashboardNavbar.module.scss'
import { UserInfo } from '@/entities/user'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { titlesData } from '../../model/data/titles.data'

export const DashboardNavbar = () => {
	const pathname = usePathname()
	const [title, setTitle] = useState('')

	useEffect(() => {
		setTitle(titlesData[pathname || ''])
	}, [pathname])

	return (
		<header className={clsx(cls.DashboardNavbar)}>
			<HStack
				className={cls.container}
				align='center'
				justify='space-between'
				gap='20'
			>
				<Text.HeadlineH2 sx={{ fontWeight: '700' }}>{title}</Text.HeadlineH2>
				<UserInfo />
			</HStack>
		</header>
	)
}
