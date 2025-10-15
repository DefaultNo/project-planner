import clsx from 'clsx'
import { Control, Controller } from 'react-hook-form'

import cls from './TaskColumnSelect.module.scss'
import { Select } from '@/shared/ui/Select/Select'

interface TaskColumnSelectProps {
	className?: string
	control: Control
}

const selectOptions = [
	{ color: 'var(--primary-color)', label: 'High', value: 'high' },
	{ color: 'var(--tertiary-color)', label: 'Medium', value: 'medium' },
	{ color: 'var(--error-color)', label: 'Low', value: 'low' }
]

export const TaskColumnSelect = (props: TaskColumnSelectProps) => {
	const { className, control } = props

	return (
		<div className={clsx(cls.TaskColumnSelect, [className])}>
			<Controller
				name='priority'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Select
						className={cls.select}
						data={selectOptions}
						onChange={onChange}
						value={value}
						isColorSelect
					/>
				)}
			/>
		</div>
	)
}
