import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { usePomodoroSettings } from '../../../lib/hooks/usePomodoroSettings/usePomodoroSettings'
import { pomodoroService } from '../../../model/services/pomodoro/pomodoro.service'
import { IPomodoroRoundResponse } from '../../../model/types/pomodoro.types'

interface IUseTodaySession {
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
}

export const useTodaySession = ({
	setActiveRound,
	setSecondsLeft
}: IUseTodaySession) => {
	const { data: pomodoroSettings } = usePomodoroSettings()

	const workInterval = pomodoroSettings?.workInterval || 50

	const {
		data: sessionResponse,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: ['get-today-session'],
		queryFn: () => pomodoroService.getTodaySession()
	})

	const rounds = sessionResponse?.data.pomodoroRounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return { sessionResponse, isLoading, refetch, isSuccess, workInterval }
}
