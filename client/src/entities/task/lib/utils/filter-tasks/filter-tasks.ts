import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { tasksFilters } from '../../../model/data/columns.data'
import { ColumnsIds } from '../../../model/types/data.types'
import { ITaskResponse } from '../../../model/types/task.types'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const filterTasks = (tasks: ITaskResponse[], value: ColumnsIds) => {
	switch (value) {
		case ColumnsIds.TODAY:
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(tasksFilters.today, 'day') &&
					!item.isCompleted
			)

		case ColumnsIds.TOMORROW:
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(tasksFilters.tomorrow, 'day') &&
					!item.isCompleted
			)

		case ColumnsIds.ON_THIS_WEEK:
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isAfter(tasksFilters.today, 'day') &&
					dayjs(item.createdAt).isAfter(tasksFilters.tomorrow, 'day') &&
					dayjs(item.createdAt).isSameOrBefore(
						tasksFilters['on-this-week'],
						'day'
					) &&
					!item.isCompleted
			)

		case ColumnsIds.ON_NEXT_WEEK:
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isAfter(tasksFilters['on-this-week']) &&
					dayjs(item.createdAt).isSameOrBefore(tasksFilters['on-next-week']) &&
					!item.isCompleted
			)

		case ColumnsIds.LATER:
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isAfter(
						tasksFilters['on-next-week'] || !item.createdAt
					) && !item.isCompleted
			)

		case ColumnsIds.COMPLETED:
			return tasks?.filter(item => item.isCompleted)

		default:
			return []
	}
}
