import { useEffect, useState } from 'react'

import { usePomodoroSettings } from '../../../lib/hooks/usePomodoroSettings/usePomodoroSettings'
import { IPomodoroRoundResponse } from '../../../model/types/pomodoro.types'

export const useTimer = () => {
	const { data: pomodoroSettings } = usePomodoroSettings()

	const workInterval = pomodoroSettings?.workInterval ?? 50
	const breakInterval = pomodoroSettings?.breakInterval ?? 10

	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
	const [secondsLeft, setSecondsLeft] = useState<number>(workInterval * 60)
	const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(prevSeconds => Math.max(prevSeconds - 1, 0))
			}, 1000)
		} else if (!isRunning && interval) {
			clearInterval(interval)
		}

		return () => {
			interval && clearInterval(interval)
		}
	}, [isRunning])

	useEffect(() => {
		if (secondsLeft > 0) return

		if (isBreakTime) {
			setIsRunning(false)
		} else {
			setIsBreakTime(true)
			setSecondsLeft(breakInterval * 60)
			setIsRunning(true)
		}
	}, [secondsLeft, isBreakTime, breakInterval])

	const resetTimer = () => {
		setIsRunning(false)
		setIsBreakTime(false)
		setSecondsLeft(workInterval * 60)
	}

	return {
		isRunning,
		isBreakTime,
		setSecondsLeft,
		activeRound,
		secondsLeft,
		setIsRunning,
		resetTimer,
		setActiveRound
	}
}
