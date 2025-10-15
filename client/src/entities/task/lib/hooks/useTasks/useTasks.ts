import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { taskService } from '../../../model/services/task/task.service'
import { ITaskResponse } from '../../../model/types/task.types'

export const useTasks = () => {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})

	const [tasks, setTasks] = useState<ITaskResponse[]>(data?.data || [])

	useEffect(() => {
		setTasks(data?.data || [])
	}, [data?.data])

	return { tasks, setTasks }
}
