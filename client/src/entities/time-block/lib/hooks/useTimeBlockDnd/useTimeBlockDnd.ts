import {
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

import { timeBlockService } from '@/entities/time-block'

import { ITimeBlockResponse } from '../../../model/types/time-block.types'

interface UseTimeBlockDndProps {
	blocks: ITimeBlockResponse[] | undefined
	setBlocks: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>
}

export const useTimeBlockDnd = (props: UseTimeBlockDndProps) => {
	const { blocks, setBlocks } = props

	const queryClient = useQueryClient()

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	)

	const { mutate: updateTimeBlockOrder } = useMutation({
		mutationKey: ['update-order-time-block'],
		mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlock(ids),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['time-blocks'] })
		}
	})

	const handlerDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id && blocks) {
			const oldIndex = blocks.findIndex(block => block.id === active.id)
			const newIndex = blocks.findIndex(block => block.id === (over?.id || ''))

			if (oldIndex !== -1 && newIndex !== -1) {
				const newBlocks = arrayMove(blocks, oldIndex, newIndex)
				setBlocks(blocks)
				updateTimeBlockOrder(newBlocks.map(block => block.id))
			}
		}
	}

	return { handlerDragEnd, sensors }
}
