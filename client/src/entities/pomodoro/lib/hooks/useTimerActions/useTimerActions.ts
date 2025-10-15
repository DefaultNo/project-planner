import { Dispatch, SetStateAction } from 'react'

import { IPomodoroRoundResponse } from '../../../model/types/pomodoro.types'
import { usePomodoroSettings } from '../usePomodoroSettings/usePomodoroSettings'
import { useUpdateRound } from '../useUpdateRound/useUpdateRound'

interface IUseTimerActions {
	secondsLeft: number
	activeRound: IPomodoroRoundResponse | undefined
	setIsRunning: Dispatch<SetStateAction<boolean>>
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
	rounds: IPomodoroRoundResponse[] | undefined
}

export const useTimerActions = ({
	activeRound,
	setIsRunning,
	setActiveRound,
	secondsLeft,
	rounds
}: IUseTimerActions) => {
	const { data: pomodoroSettings } = usePomodoroSettings()
	const { updateRound, isUpdateRoundPending } = useUpdateRound()

	const workInterval = pomodoroSettings?.workInterval ?? 50

	const pause = () => {
		setIsRunning(false)

		if (activeRound?.id) {
			updateRound({
				id: activeRound?.id,
				data: {
					totalSeconds: secondsLeft,
					isCompleted: Math.floor(secondsLeft / 60) >= workInterval
				}
			})
		}
	}

	const play = () => {
		setIsRunning(true)
	}

	const next = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		})
	}

	const prev = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)

		if (!lastCompletedRound?.id) return

		updateRound({
			id: lastCompletedRound.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		})

		setActiveRound(lastCompletedRound)
	}

	return { play, pause, next, prev, isUpdateRoundPending }
}
