import { useFormContext } from 'react-hook-form'

import cls from './TimeBlockItem.module.scss'
import GripIcon from '@/shared/assets/icons/Grip.svg'
import PencilIcon from '@/shared/assets/icons/Pencil.svg'
import TrashIcon from '@/shared/assets/icons/Trash.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { useDeleteTimeBlock } from '../../lib/hooks/useDeleteTimeBlock/useDeleteTimeBlock'
import { useTimeBlockSortable } from '../../lib/hooks/useTimeBlockSortable/useTimeBlockSortable'
import {
	ITimeBlockResponse,
	TimeBlockFormState
} from '../../model/types/time-block.types'

export const TimeBlockItem = ({ block }: { block: ITimeBlockResponse }) => {
	const { attributes, listeners, style, setNodeRef } = useTimeBlockSortable(
		block.id
	)

	const { reset } = useFormContext<TimeBlockFormState>()

	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(block.id)

	const onEditClick = () => {
		reset({
			id: block.id,
			color: block.color,
			duration: block.duration,
			name: block.name,
			order: block.order
		})
	}

	const onDeleteClick = () => {
		deleteTimeBlock()
	}

	return (
		<HStack
			className={cls.TimeBlockItem}
			align='center'
			ref={setNodeRef}
			style={{
				...style,
				backgroundColor: block.color,
				minHeight: block.duration / 1.5 + 60
			}}
		>
			<IconButton size='small' theme='standard' {...listeners} {...attributes}>
				<Icon SVG={GripIcon} />
			</IconButton>
			<HStack flexGrow={1} justify='space-between' gap='8'>
				<VStack gap='4'>
					<Text sx={{ fontSize: 'body-l', fontWeight: '600' }}>
						{block.name}
					</Text>
					<Text sx={{ fontSize: 'body-m' }}>{`${block.duration} min.`}</Text>
				</VStack>
				<HStack gap='8' align='center'>
					<Button theme='filled' size='small' onClick={onEditClick}>
						<Icon SVG={PencilIcon} />
						Edit
					</Button>
					<Button
						theme='filled'
						color='error'
						size='small'
						onClick={onDeleteClick}
						disabled={isDeletePending}
					>
						<Icon SVG={TrashIcon} />
						Delete
					</Button>
				</HStack>
			</HStack>
		</HStack>
	)
}
