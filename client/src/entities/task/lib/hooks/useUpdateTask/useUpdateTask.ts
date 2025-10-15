import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '../../../model/services/task/task.service'
import { TaskFormState } from '../../../model/types/task.types'

export const useUpdateTask = (key?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update-task', key],
		mutationFn: ({ id, data }: { id: string | number; data: TaskFormState }) =>
			taskService.updateTask(id, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
	})

	return { updateTask }
}
