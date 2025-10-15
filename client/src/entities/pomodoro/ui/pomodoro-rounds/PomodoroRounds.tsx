import clsx from 'clsx'
import { memo } from 'react'

import cls from './PomodoroRounds.module.scss'
import ChevronLeftIcon from '@/shared/assets/icons/ChevronLeft.svg'
import ChevronRightIcon from '@/shared/assets/icons/ChevronRight.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { HStack } from '@/shared/ui/Stack'

import { IPomodoroRoundResponse } from '../../model/types/pomodoro.types'

interface PomodoroRoundsProps {
	rounds: IPomodoroRoundResponse[] | undefined
	activeRound: IPomodoroRoundResponse | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	resetTimer: () => void
}

const Rounds = ({
	rounds,
	activeRound
}: {
	rounds: IPomodoroRoundResponse[] | undefined
	activeRound: IPomodoroRoundResponse | undefined
}) => {
	return rounds?.map(round => {
		const mods = {
			[cls.completed]: round.isCompleted,
			[cls.active]: round.id === activeRound?.id && !round.isCompleted
		}
		return <div key={round.id} className={clsx(cls.round, mods)} />
	})
}

export const PomodoroRounds = memo((props: PomodoroRoundsProps) => {
	const {
		rounds,
		activeRound,
		nextRoundHandler,
		prevRoundHandler,
		resetTimer
	} = props

	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false

	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	const onClickPrev = () => {
		isCanPrevRound && prevRoundHandler()
		resetTimer()
	}

	const onClickNext = () => {
		isCanNextRound && nextRoundHandler()
		resetTimer()
	}

	return (
		<HStack className={clsx(cls.PomodoroRounds)} gap='12' align='center'>
			<Button
				size='small'
				theme='text'
				onClick={onClickPrev}
				disabled={!isCanPrevRound}
			>
				<Icon SVG={ChevronLeftIcon} />
				Previous
			</Button>
			<HStack gap='8' align='center'>
				<Rounds rounds={rounds} activeRound={activeRound} />
			</HStack>
			<Button
				size='small'
				theme='text'
				onClick={onClickNext}
				disabled={!isCanNextRound}
			>
				Next
				<Icon SVG={ChevronRightIcon} />
			</Button>
		</HStack>
	)
})
