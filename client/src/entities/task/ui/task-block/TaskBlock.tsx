import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import cls from './TaskBlock.module.scss'
import { tasksFilters } from '@/entities/task/model/data/columns.data'
import { TaskAddInput } from '@/entities/task/ui/task-add-input/TaskAddInput'
import { TaskRow } from '@/entities/task/ui/task-row/TaskRow'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { filterTasks } from '../../lib/utils/filter-tasks/filter-tasks'
import { ColumnsIds } from '../../model/types/data.types'
import { ITaskResponse } from '../../model/types/task.types'

interface TaskBlockProps {
	value: ColumnsIds
	label: string
	items: ITaskResponse[]
	setItems: Dispatch<SetStateAction<ITaskResponse[]>>
}

const TaskRows = (props: Omit<TaskBlockProps, 'label'>) => {
	const { items, value, setItems } = props

	return (
		<VStack className={cls.rows} gap='4'>
			{filterTasks(items, value)?.map(item => {
				return (
					<TaskRow
						key={item.id}
						taskBlockId={value}
						item={item}
						setItems={setItems}
					/>
				)
			})}
		</VStack>
	)
}

const TaskFooter = (props: Omit<TaskBlockProps, 'label'>) => {
	const { items, value, setItems } = props

	return (
		<VStack className={cls.rows} gap='4'>
			{value !== ColumnsIds.COMPLETED && !items?.some(item => !item.id) && (
				<HStack justify='start'>
					<TaskAddInput
						setItems={setItems}
						filterDate={
							tasksFilters[value] ? tasksFilters[value].format() : undefined
						}
					/>
				</HStack>
			)}
		</VStack>
	)
}

export const TaskBlock = (props: TaskBlockProps) => {
	const { value, label, items, setItems } = props
	const { setNodeRef, isOver } = useDroppable({
		id: value,
		data: {
			type: 'TaskBlock'
		}
	})

	const mods = {
		[cls.dragging]: isOver
	}

	return (
		<VStack ref={setNodeRef} className={clsx(cls.TaskBlock, mods)}>
			<Text
				className={cls.title}
				sx={{ fontSize: 'body-l', fontWeight: '600' }}
			>
				{label}
			</Text>
			<TaskRows items={items} value={value} setItems={setItems} />
			<TaskFooter items={items} value={value} setItems={setItems} />
		</VStack>
	)
}
