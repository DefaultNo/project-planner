import clsx from 'clsx'
import { Control, Controller } from 'react-hook-form'

import cls from './TaskColumnDatePicker.module.scss'
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker'

interface TaskColumnDatePickerProps {
	className?: string
	control: Control
}

export const TaskColumnDatePicker = (props: TaskColumnDatePickerProps) => {
	const { className, control } = props

	return (
		<div className={clsx(cls.TaskColumnDatePicker, [className])}>
			<Controller
				name='createdAt'
				control={control}
				render={({ field: { value, onChange } }) => (
					<DatePicker
						className={cls.datepicker}
						onChange={onChange}
						value={value || ''}
					/>
				)}
			/>
		</div>
	)
}
