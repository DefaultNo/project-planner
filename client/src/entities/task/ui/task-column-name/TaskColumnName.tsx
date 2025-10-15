import clsx from 'clsx'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

import cls from './TaskColumnName.module.scss'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input } from '@/shared/ui/Input/Input'
import { HStack } from '@/shared/ui/Stack'

import { TaskFormState } from '../../model/types/task.types'

interface TaskColumnNameProps {
	className?: string
	control: Control
	register: UseFormRegister<TaskFormState>
}

export const TaskColumnName = (props: TaskColumnNameProps) => {
	const { className, control, register } = props

	return (
		<HStack
			className={clsx(cls.TaskColumnName, [className])}
			align='center'
			gap='4'
		>
			<Controller
				name='isCompleted'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Checkbox
						id={'isCompleted'}
						name={'isCompleted'}
						checked={value}
						onChange={onChange}
					/>
				)}
			/>
			<Input
				{...register('name')}
				className={cls.input}
				autoComplete='off'
				placeholder='Enter the name of the task...'
			/>
		</HStack>
	)
}
