import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { ColumnsIds, FilterableIds, IColumnsData } from '../types/data.types'

dayjs.extend(isoWeek)
dayjs.extend(weekOfYear)

export const tasksFilters: Record<FilterableIds, Dayjs> = {
	[ColumnsIds.TODAY]: dayjs().startOf('day'),
	[ColumnsIds.TOMORROW]: dayjs().add(1, 'day').startOf('day'),
	[ColumnsIds.ON_THIS_WEEK]: dayjs().endOf('isoWeek'),
	[ColumnsIds.ON_NEXT_WEEK]: dayjs().add(1, 'week').startOf('day'),
	[ColumnsIds.LATER]: dayjs().add(2, 'week').startOf('day')
}

export const tasksColumnsData: IColumnsData[] = [
	{
		id: ColumnsIds.TODAY,
		label: 'Today'
	},
	{
		id: ColumnsIds.TOMORROW,
		label: 'Tomorrow'
	},
	{
		id: ColumnsIds.ON_THIS_WEEK,
		label: 'On this week'
	},
	{
		id: ColumnsIds.ON_NEXT_WEEK,
		label: 'On next week'
	},
	{
		id: ColumnsIds.LATER,
		label: 'Later'
	},
	{
		id: ColumnsIds.COMPLETED,
		label: 'Completed'
	}
]
