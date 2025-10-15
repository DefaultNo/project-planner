import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'

import cls from './TimeBlockForm.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { Select } from '@/shared/ui/Select/Select'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { useCreateTimeBlock } from '../../lib/hooks/useCreateTimeBlock/useCreateTimeBlock'
import { useUpdateTimeBlock } from '../../lib/hooks/useUpdateTimeBlock/useUpdateTimeBlock'
import { TimeBlockColors } from '../../model/constants/colors'
import { TimeBlockFormState } from '../../model/types/time-block.types'

const selectOptions = [
	{
		color: TimeBlockColors.COLOR_1,
		label: 'Red',
		value: TimeBlockColors.COLOR_1
	},
	{
		label: 'Pink',
		value: TimeBlockColors.COLOR_2,
		color: TimeBlockColors.COLOR_2
	},
	{
		label: 'Purple',
		value: TimeBlockColors.COLOR_3,
		color: TimeBlockColors.COLOR_3
	},
	{
		label: 'Blue',
		value: TimeBlockColors.COLOR_4,
		color: TimeBlockColors.COLOR_4
	},
	{
		label: 'Cyan',
		value: TimeBlockColors.COLOR_5,
		color: TimeBlockColors.COLOR_5
	},
	{
		label: 'Green',
		value: TimeBlockColors.COLOR_6,
		color: TimeBlockColors.COLOR_6
	}
]

export const TimeBlockForm = () => {
	const { register, control, watch, reset, handleSubmit } =
		useFormContext<TimeBlockFormState>()

	const existsId = watch('id')
	const nameValue = watch('name')
	const durationValue = watch('duration')

	const { updateTimeBlock } = useUpdateTimeBlock(existsId)
	const { createTimeBlock, isPending } = useCreateTimeBlock()

	const onSubmit: SubmitHandler<TimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updateTimeBlock({
				id,
				data: dto
			})
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: TimeBlockColors.INITIAL,
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		})
	}

	return (
		<form className={cls.TimeBlockForm} onSubmit={handleSubmit(onSubmit)}>
			<div className={cls.inputs}>
				<Input
					theme='filled'
					id='name'
					label='Name'
					placeholder='Enter name'
					value={nameValue}
					{...register('name', { required: true })}
				/>
				<Input
					theme='filled'
					id='duration'
					label='Duration'
					type='number'
					placeholder='Enter duration (min.)'
					value={String(durationValue)}
					{...register('duration', {
						required: true,
						valueAsNumber: true,
						min: 1
					})}
				/>
			</div>
			<VStack gap='8'>
				<VStack gap='4' className={cls.select}>
					<Text sx={{ fontSize: 'body-m', fontWeight: '600' }}>Color:</Text>
					<Controller
						control={control}
						name='color'
						render={({ field: { value, onChange } }) => (
							<Select
								label='Select color'
								data={selectOptions}
								onChange={onChange}
								value={value || TimeBlockColors.INITIAL}
								isColorSelect
							/>
						)}
					/>
				</VStack>
				<Button theme='filled' type='submit' disabled={isPending}>
					{existsId ? 'Update' : 'Create'}
				</Button>
			</VStack>
		</form>
	)
}
