'use client'

import clsx from 'clsx'

import cls from './Pomodoro.module.scss'
import PauseIcon from '@/shared/assets/icons/Pause.svg'
import PlayIcon from '@/shared/assets/icons/Play.svg'
import RestartIcon from '@/shared/assets/icons/Restart.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Loader } from '@/shared/ui/Loader/Loader'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { useCreateSession } from '../../lib/hooks/useCreateSession/useCreateSession'
import { useDeleteSession } from '../../lib/hooks/useDeleteSession/useDeleteSession'
import { useTimer } from '../../lib/hooks/useTimer/useTimer'
import { useTimerActions } from '../../lib/hooks/useTimerActions/useTimerActions'
import { useTodaySession } from '../../lib/hooks/useTodaySession/useTodaySession'
import { formatTime } from '../../lib/utils/format-time/format-time'
import { PomodoroRounds } from '../../ui/pomodoro-rounds/PomodoroRounds'

export const Pomodoro = () => {
	const {
		isRunning,
		setSecondsLeft,
		setIsRunning,
		setActiveRound,
		activeRound,
		isBreakTime,
		resetTimer,
		secondsLeft
	} = useTimer()

	const { isLoading, sessionResponse, workInterval } = useTodaySession({
		setActiveRound,
		setSecondsLeft
	})

	const rounds = sessionResponse?.data.pomodoroRounds
	const id = sessionResponse?.data.id

	const { next, prev, pause, play, isUpdateRoundPending } = useTimerActions({
		activeRound,
		setIsRunning,
		setActiveRound,
		secondsLeft,
		rounds
	})

	const onDeleteSuccess = () => {
		setSecondsLeft(workInterval * 60)
	}

	const { deleteSession, isDeletePending } = useDeleteSession(onDeleteSuccess)
	const { createSession, isCreatePending } = useCreateSession()

	const timerStartHandler = () => {
		if (secondsLeft === 0 && isBreakTime) resetTimer()
		isRunning ? pause() : play()
	}

	const refreshHandler = () => {
		setIsRunning(false)
		id && deleteSession(id)
	}

	const createSessionHandler = () => {
		createSession()
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<VStack
			className={clsx(cls.Pomodoro)}
			gap='20'
			align='center'
			justify='center'
		>
			<Text sx={{ fontSize: 'title-l', fontWeight: '600' }}>
				{isBreakTime ? "It's rest time!" : "It's time to work!"}
			</Text>
			<Text sx={{ fontSize: 'display-l', fontWeight: '600' }}>
				{formatTime(secondsLeft)}
			</Text>
			{sessionResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						activeRound={activeRound}
						nextRoundHandler={next}
						prevRoundHandler={prev}
						resetTimer={resetTimer}
					/>
					<HStack gap='20' align='center'>
						<Button
							theme='filled'
							onClick={timerStartHandler}
							disabled={isUpdateRoundPending}
						>
							{isRunning ? <Icon SVG={PauseIcon} /> : <Icon SVG={PlayIcon} />}
							{isRunning ? 'Pause' : 'Play'}
						</Button>
						<Button
							theme='outlined'
							onClick={refreshHandler}
							disabled={isDeletePending}
						>
							<Icon SVG={RestartIcon} />
							Restart
						</Button>
					</HStack>
				</>
			) : (
				<Button
					theme='filled'
					onClick={createSessionHandler}
					disabled={isCreatePending}
				>
					Create session
				</Button>
			)}
		</VStack>
	)
}
