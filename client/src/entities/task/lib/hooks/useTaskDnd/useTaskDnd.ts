import { tasksFilters } from '../../../model/data/columns.data'
import { ColumnsIds, TasksDragEndEvent } from '../../../model/types/data.types'
import { useUpdateTask } from '../../hooks/useUpdateTask/useUpdateTask'

export const useTaskDnd = () => {
	const { updateTask } = useUpdateTask()

	const onDragEnd = (event: TasksDragEndEvent) => {
		const { active, over } = event

		if (!over) return

		if (over.data.current?.type === 'TaskBlock') {
			const activeTaskBlockId = active.data.current?.taskBlockId
			const overTaskBlockId = over.id

			if (activeTaskBlockId === overTaskBlockId) return

			if (overTaskBlockId === ColumnsIds.COMPLETED) {
				updateTask({
					id: active.data.current?.task.id,
					data: {
						isCompleted: true
					}
				})

				return
			}

			const newCreatedAt = tasksFilters[overTaskBlockId].format()

			updateTask({
				id: active.data.current?.task.id,
				data: {
					createdAt: newCreatedAt,
					isCompleted: false
				}
			})
		}
	}

	return { onDragEnd }
}
