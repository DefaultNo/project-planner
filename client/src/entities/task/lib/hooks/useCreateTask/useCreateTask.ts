import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/entities/task'
import { TaskFormState } from '@/entities/task/model/types/task.types'

export const useCreateTask = () => {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create-task'],
		mutationFn: (data: TaskFormState) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return { createTask }
}
