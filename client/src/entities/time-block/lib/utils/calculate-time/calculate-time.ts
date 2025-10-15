import { ITimeBlockResponse } from '../../../model/types/time-block.types'

export const calculateTime = (blocks: ITimeBlockResponse[] | undefined) => {
	const totalMinutes =
		blocks?.reduce((acc, block) => acc + block.duration, 0) || 0
	const totalHours = Math.floor(totalMinutes / 60)

	return 24 - totalHours
}
