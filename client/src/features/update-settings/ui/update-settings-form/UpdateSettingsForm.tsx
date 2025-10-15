import { SubmitHandler, useForm } from 'react-hook-form'

import cls from './UpdateSettingsForm.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { HStack, VStack } from '@/shared/ui/Stack'

import { useInitialData } from '../../lib/hooks/useInititalData/useInitialData'
import { useUpdateSettings } from '../../lib/hooks/useUpdateSettings/useUpdateSettings'
import { CombinedForm } from '../../model/types/update-settings.types'

export const UpdateSettingsForm = () => {
	const { register, handleSubmit, reset, watch } = useForm<CombinedForm>({
		mode: 'onSubmit',
		defaultValues: {
			name: '',
			email: '',
			workInterval: 0,
			intervalsCount: 0,
			breakInterval: 0
		}
	})

	const nameValue = watch('name')
	const emailValue = watch('email')
	const workIntervalValue = watch('workInterval')
	const breakIntervalValue = watch('breakInterval')
	const intervalsCountValue = watch('intervalsCount')

	const { mutate, isPending } = useUpdateSettings()

	useInitialData(reset)

	const onSubmit: SubmitHandler<CombinedForm> = data => {
		const { password, ...other } = data

		mutate({
			...other,
			password: password || undefined
		})
	}

	return (
		<form className={cls.UpdateSettingsForm} onSubmit={handleSubmit(onSubmit)}>
			<div className={cls.inner}>
				<VStack gap='20'>
					<Input
						id='name'
						label='Name'
						theme='filled'
						placeholder='Enter name'
						value={nameValue}
						{...register('name')}
					/>
					<Input
						id='email'
						label='Email'
						theme='filled'
						placeholder='Enter email'
						value={emailValue}
						{...register('email')}
					/>
					<Input
						id='password'
						type='password'
						theme='filled'
						placeholder='Enter new password'
						autoComplete='off'
						{...register('password')}
					/>
				</VStack>
				<VStack gap='20'>
					<Input
						id='work-interval'
						type='number'
						theme='filled'
						label='Work Interval'
						value={String(workIntervalValue)}
						placeholder='Enter work interval'
						{...register('workInterval', { valueAsNumber: true })}
					/>
					<Input
						id='break-interval'
						type='number'
						label='Break Interval'
						theme='filled'
						value={String(breakIntervalValue)}
						placeholder='Enter break interval'
						{...register('breakInterval', { valueAsNumber: true })}
					/>
					<Input
						id='intervals-count'
						type='number'
						label='Intervals Count'
						theme='filled'
						value={String(intervalsCountValue)}
						placeholder='Enter intervals count'
						autoComplete='off'
						{...register('intervalsCount', { valueAsNumber: true })}
					/>
				</VStack>
			</div>
			<HStack>
				<Button theme='filled' type='submit' disabled={isPending}>
					Send
				</Button>
			</HStack>
		</form>
	)
}
