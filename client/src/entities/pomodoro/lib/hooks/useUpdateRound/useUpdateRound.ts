import { useMutation, useQueryClient } from '@tanstack/react-query'

import { pomodoroService } from '../../../model/services/pomodoro/pomodoro.service'
import { PomodoroRoundState } from '../../../model/types/pomodoro.types'

export const useUpdateRound = () => {
	const queryClient = useQueryClient()

	const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
		mutationKey: ['update-round'],
		mutationFn: ({ id, data }: { id: string; data: PomodoroRoundState }) =>
			pomodoroService.updateRound(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get-today-session'] })
		}
	})

	return { updateRound, isUpdateRoundPending }
}
