import { debounce } from 'lodash'
// Используем lodash для удобства
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TaskFormState } from '../../../model/types/task.types'
import { useCreateTask } from '../useCreateTask/useCreateTask'
import { useUpdateTask } from '../useUpdateTask/useUpdateTask'

export const useTaskDebounce = ({
	itemId,
	watch
}: {
	itemId: string
	watch: UseFormWatch<TaskFormState>
}) => {
	const { createTask } = useCreateTask()
	const { updateTask } = useUpdateTask()

	const debounceCreateTask = useCallback(
		debounce((formData: TaskFormState) => {
			createTask(formData)
		}, 500),
		[createTask]
	)

	const debounceUpdateTask = useCallback(
		debounce((formData: TaskFormState) => {
			updateTask({ id: itemId, data: formData })
		}, 500),
		[updateTask, itemId]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || null
				})
			} else {
				debounceCreateTask(formData)
			}
		})

		return () => {
			debounceCreateTask.cancel()
			debounceUpdateTask.cancel()
			unsubscribe()
		}
	}, [watch, itemId, debounceCreateTask, debounceUpdateTask])
}
