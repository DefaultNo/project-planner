import { IBaseEntity } from '@/shared/types/root.types'

import { TaskPriority } from '../constants/task.constants'

export interface ITaskResponse extends IBaseEntity {
	name: string
	priority?: TaskPriority | null
	isCompleted: boolean
}

export type TaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
