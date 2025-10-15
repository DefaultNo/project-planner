import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/shared/ui/Button/Button'

import { ITaskResponse } from '../../model/types/task.types'

interface TaskAddInputProps {
	filterDate: string | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[]>>
}

export const TaskAddInput = (props: TaskAddInputProps) => {
	const { filterDate, setItems } = props

	const addRow = () => {
		setItems(prev => {
			if (!prev) return []

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<Button size='small' theme='text' onClick={addRow}>
			Add new task...
		</Button>
	)
}
