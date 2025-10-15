'use client'

import clsx from 'clsx'

import cls from './TasksPage.module.scss'
import { Tasks } from '@/entities/task'
import { VStack } from '@/shared/ui/Stack'

export const TasksPage = () => {
	return (
		<VStack className={clsx(cls.TasksPage)} gap='20'>
			<Tasks />
		</VStack>
	)
}
