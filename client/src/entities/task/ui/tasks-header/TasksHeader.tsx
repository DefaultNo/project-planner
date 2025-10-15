import clsx from 'clsx'

import cls from './TasksHeader.module.scss'
import { Text } from '@/shared/ui/Text/Text'

const tasksHeaderColumns = [
	{ name: '' },
	{ name: 'Task Name' },
	{ name: 'Due Date' },
	{ name: 'Priority' },
	{ name: '' }
]

const Columns = () => {
	return tasksHeaderColumns.map(({ name }, index) => (
		<Text
			key={index}
			sx={{ fontSize: 'body-m', fontWeight: '600' }}
			className={cls.column}
		>
			{name}
		</Text>
	))
}

export const TasksHeader = () => {
	return (
		<div className={clsx(cls.TasksHeader, {}, [])}>
			<Columns />
		</div>
	)
}
