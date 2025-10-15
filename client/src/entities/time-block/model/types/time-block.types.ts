import { IBaseEntity } from '@/shared/types/root.types'

export interface ITimeBlockResponse extends IBaseEntity {
	name: string
	color?: string
	duration: number
	order: number
}

export type TimeBlockFormState = Partial<
	Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
>
