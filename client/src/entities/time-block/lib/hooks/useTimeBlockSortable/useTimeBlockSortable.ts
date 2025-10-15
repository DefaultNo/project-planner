import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react'

export const useTimeBlockSortable = (id: UniqueIdentifier) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const adjustedTransform = transform ? { ...transform, scaleY: 1 } : null

	const style: CSSProperties = {
		transform: CSS.Transform.toString(adjustedTransform),
		transition
	}

	return { attributes, listeners, setNodeRef, style }
}
