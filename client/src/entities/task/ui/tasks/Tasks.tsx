'use client'

import { DndContext, rectIntersection } from '@dnd-kit/core'
import clsx from 'clsx'

import cls from './Tasks.module.scss'
import { TasksBlocks } from '@/entities/task/ui/task-blocks/TasksBlocks'
import { TasksHeader } from '@/entities/task/ui/tasks-header/TasksHeader'
import { VStack } from '@/shared/ui/Stack'

import { useTaskDnd } from '../../lib/hooks/useTaskDnd/useTaskDnd'

export const Tasks = () => {
	const { onDragEnd } = useTaskDnd()

	return (
		<DndContext onDragEnd={onDragEnd} collisionDetection={rectIntersection}>
			<VStack gap='4' className={clsx(cls.Tasks)}>
				<TasksHeader />
				<TasksBlocks />
			</VStack>
		</DndContext>
	)
}
