import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { PomodoroForm, pomodoroService } from '@/entities/pomodoro'
import { UserForm, userService } from '@/entities/user'

import { CombinedForm } from '../../../model/types/update-settings.types'

export const useUpdateSettings = () => {
	const queryClient = useQueryClient()

	const mutationFn = async (data: CombinedForm) => {
		const userData: UserForm = {
			name: data.name,
			email: data.email,
			password: data.password
		}

		const pomodoroData: PomodoroForm = {
			workInterval: data.workInterval,
			breakInterval: data.breakInterval,
			intervalsCount: data.intervalsCount
		}

		await userService.update(userData)
		await pomodoroService.updateSettings(pomodoroData)
	}

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: mutationFn,
		onSuccess() {
			toast.success('Settings updated successfully!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({ queryKey: ['pomodoro-timer'] })
		}
	})

	return { mutate, isPending }
}
