import clsx from 'clsx'

import cls from './TasksBlocks.module.scss'
import { TaskBlock } from '@/entities/task/ui/task-block/TaskBlock'

import { useTasks } from '../../lib/hooks/useTasks/useTasks'
import { tasksColumnsData } from '../../model/data/columns.data'

export const TasksBlocks = () => {
	const { tasks, setTasks } = useTasks()

	return (
		<div className={clsx(cls.TasksBlocks)}>
			{tasksColumnsData.map(({ id, label }) => (
				<TaskBlock
					key={id}
					value={id}
					label={label}
					items={tasks}
					setItems={setTasks}
				/>
			))}
		</div>
	)
}
