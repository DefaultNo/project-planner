import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { timeBlockService } from '../../../model/services/time-block/time-block.service'
import { ITimeBlockResponse } from '../../../model/types/time-block.types'

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => timeBlockService.getTimeBlocks()
	})

	const [blocks, setBlocks] = useState<ITimeBlockResponse[] | undefined>(
		data?.data
	)

	useEffect(() => {
		setBlocks(data?.data)
	}, [data?.data])

	return { blocks, setBlocks, isLoading }
}
