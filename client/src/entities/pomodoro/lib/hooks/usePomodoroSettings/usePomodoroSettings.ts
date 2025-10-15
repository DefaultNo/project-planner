import { useQuery } from '@tanstack/react-query'

import { pomodoroService } from '../../../model/services/pomodoro/pomodoro.service'

export function usePomodoroSettings() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['pomodoro-settings'],
		queryFn: () => pomodoroService.getSettings()
	})

	return { data, isLoading, isSuccess }
}
