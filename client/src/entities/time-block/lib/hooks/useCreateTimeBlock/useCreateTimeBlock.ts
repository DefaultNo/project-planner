import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timeBlockService } from '@/entities/time-block'
import { TimeBlockFormState } from '@/entities/time-block/model/types/time-block.types'

export const useCreateTimeBlock = () => {
	const queryClient = useQueryClient()

	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: ['create-time-block'],
		mutationFn: (data: TimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			})
		}
	})

	return {
		createTimeBlock,
		isPending
	}
}
