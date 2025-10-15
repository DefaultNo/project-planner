import { DndContext, closestCorners } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import cls from './TimeBlockList.module.scss'
import { Loader } from '@/shared/ui/Loader/Loader'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { useTimeBlockDnd } from '../../lib/hooks/useTimeBlockDnd/useTimeBlockDnd'
import { useTimeBlocks } from '../../lib/hooks/useTimeBlocks/useTimeBlocks'
import { calculateTime } from '../../lib/utils/calculate-time/calculate-time'
import type { ITimeBlockResponse } from '../../model/types/time-block.types'
import { TimeBlockItem } from '../time-block-item/TimeBlockItem'

const TimeBlocks = ({
	blocks
}: {
	blocks: ITimeBlockResponse[] | undefined
}) => {
	if (!blocks?.length) return <Text>Add the first time block</Text>

	return blocks.map(block => <TimeBlockItem key={block.id} block={block} />)
}

export const TimeBlockList = () => {
	const { blocks, setBlocks, isLoading } = useTimeBlocks()
	const { handlerDragEnd, sensors } = useTimeBlockDnd({ blocks, setBlocks })

	if (isLoading) return <Loader />

	const hoursLeft = calculateTime(blocks)

	return (
		<VStack gap='20'>
			<Text
				className={cls.time}
				align='center'
				sx={{ fontSize: 'title-s', color: 'on-tertiary' }}
			>
				Remaining time for the day:
				<Text.SPAN
					sx={{ fontWeight: '600', color: 'on-tertiary' }}
				>{` ${hoursLeft} ${hoursLeft === 1 ? 'hour' : 'hours'}`}</Text.SPAN>
			</Text>
			<DndContext
				sensors={sensors}
				onDragEnd={handlerDragEnd}
				collisionDetection={closestCorners}
			>
				<VStack gap='4'>
					<SortableContext
						items={blocks || []}
						strategy={verticalListSortingStrategy}
					>
						<TimeBlocks blocks={blocks} />
					</SortableContext>
				</VStack>
			</DndContext>
		</VStack>
	)
}
