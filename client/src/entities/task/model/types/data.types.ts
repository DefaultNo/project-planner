import { Over } from '@dnd-kit/core/dist/store/types'
import type { DragEndEvent as OriginalDragEndEvent } from '@dnd-kit/core/dist/types'

type TasksOver = Over & {
	id: ColumnsIds
}

export type TasksDragEndEvent = Omit<OriginalDragEndEvent, 'over'> & {
	over: TasksOver
}

export enum ColumnsIds {
	TODAY = 'today',
	TOMORROW = 'tomorrow',
	ON_THIS_WEEK = 'on-this-week',
	ON_NEXT_WEEK = 'on-next-week',
	LATER = 'later',
	COMPLETED = 'completed'
}

export type FilterableIds = Exclude<ColumnsIds, ColumnsIds.COMPLETED>

export interface IColumnsData {
	id: ColumnsIds
	label: string
}
