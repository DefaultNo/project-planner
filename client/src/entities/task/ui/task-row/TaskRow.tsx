import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import cls from './TaskRow.module.scss'
import { TaskColumnDatePicker } from '@/entities/task/ui/task-column-date-picker/TaskColumnDatePicker'
import { TaskColumnName } from '@/entities/task/ui/task-column-name/TaskColumnName'
import { TaskColumnSelect } from '@/entities/task/ui/task-column-select/TaskColumnSelect'
import GripIcon from '@/shared/assets/icons/Grip.svg'
import TrashIcon from '@/shared/assets/icons/Trash.svg'
import { Icon } from '@/shared/ui/Icon/Icon'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { HStack } from '@/shared/ui/Stack'

import { useDeleteTask } from '../../lib/hooks/useDeleteTask/useDeleteTask'
import { useTaskDebounce } from '../../lib/hooks/useTaskDebounce/useTaskDebounce'
import { ColumnsIds } from '../../model/types/data.types'
import { ITaskResponse, TaskFormState } from '../../model/types/task.types'

interface TaskRowProps {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[]>>
	taskBlockId: ColumnsIds
}

export const TaskRow = (props: TaskRowProps) => {
	const { item, setItems, taskBlockId } = props
	const { attributes, listeners, transform, setNodeRef, isDragging } =
		useDraggable({
			id: item.id,
			data: { type: 'TaskRow', taskBlockId: taskBlockId, task: item }
		})

	const { register, control, watch } = useForm<TaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ itemId: item.id, watch })
	const { isDeletePending, deleteTask } = useDeleteTask()

	const onDeleteTask = () => {
		item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
	}

	const adjustedTransform = transform
		? { ...transform, scaleY: Math.min(transform.scaleY || 1, 1) }
		: null

	const style = {
		transform: CSS.Transform.toString(adjustedTransform)
	}

	const mods = {
		[cls.completed]: watch('isCompleted'),
		[cls.dragging]: isDragging
	}

	return (
		<div
			className={clsx(cls.TaskRow, mods)}
			style={style}
			ref={setNodeRef}
			{...attributes}
		>
			<div className={cls.inner}>
				<HStack className={cls.column}>
					<IconButton size='small' theme='standard' {...listeners}>
						<Icon SVG={GripIcon} />
					</IconButton>
				</HStack>
				<TaskColumnName
					className={cls.column}
					control={control}
					register={register}
				/>
				<TaskColumnDatePicker className={cls.column} control={control} />
				<TaskColumnSelect className={cls.column} control={control} />
				<HStack className={cls.column}>
					<IconButton
						size='small'
						theme='standard'
						disabled={isDeletePending}
						onClick={onDeleteTask}
					>
						<Icon SVG={TrashIcon} />
					</IconButton>
				</HStack>
			</div>
		</div>
	)
}
