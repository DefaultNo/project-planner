import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timeBlockService } from '../../../model/services/time-block/time-block.service'
import { TimeBlockFormState } from '../../../model/types/time-block.types'

export const useUpdateTimeBlock = (key?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateTimeBlock } = useMutation({
		mutationKey: ['update-time-block', key],
		mutationFn: ({ id, data }: { id: string; data: TimeBlockFormState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			})
		}
	})

	return { updateTimeBlock }
}
