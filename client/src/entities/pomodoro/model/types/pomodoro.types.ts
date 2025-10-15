import { IBaseEntity } from '@/shared/types/root.types'

export interface IPomodoroRoundResponse extends IBaseEntity {
	isCompleted?: boolean
	totalSeconds: number
}

export interface IPomodoroSessionResponse extends IBaseEntity {
	isCompleted?: boolean
	pomodoroRounds?: IPomodoroRoundResponse[]
}

export interface PomodoroForm {
	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export type PomodoroRoundState = Partial<
	Omit<IPomodoroRoundResponse, 'id' | 'updatedAt' | 'createdAt'>
>

export type PomodoroSessionState = Partial<
	Omit<IPomodoroSessionResponse, 'id' | 'updatedAt' | 'createdAt'>
>
