'use client'

import clsx from 'clsx'

import cls from './TimeBlockPage.module.scss'
import { TimeBlock } from '@/entities/time-block'
import { VStack } from '@/shared/ui/Stack'

export const TimeBlockPage = () => {
	return (
		<VStack className={clsx(cls.TasksPage)} gap='20'>
			<TimeBlock />
		</VStack>
	)
}
