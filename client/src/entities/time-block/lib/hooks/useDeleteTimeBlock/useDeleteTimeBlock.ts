import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timeBlockService } from '@/entities/time-block'

export const useDeleteTimeBlock = (blockId: string) => {
	const queryClient = useQueryClient()

	const { mutate: deleteTimeBlock, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete-time-block', blockId],
		mutationFn: () => timeBlockService.deleteTimeBlock(blockId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			})
		}
	})

	return { deleteTimeBlock, isDeletePending }
}
