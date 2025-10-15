'use client'

import { memo } from 'react'

import cls from './UserStatistics.module.scss'
import { IProfileResponse } from '@/entities/user'
import { useProfile } from '@/entities/user/lib/hooks/useProfile/useProfile'
import { StatisticalItem } from '@/features/user-statistics/ui/statistical-item/StatisticalItem'
import { Loader } from '@/shared/ui/Loader/Loader'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

const Statistics = ({ data }: { data: IProfileResponse | undefined }) => {
	if (data?.statistics.length) {
		return data.statistics.map(({ label, value }) => (
			<StatisticalItem key={label} label={label} value={value} />
		))
	}

	return <Text>The statistics are not loaded</Text>
}

export const UserStatistics = memo(() => {
	const { data, isLoading } = useProfile()

	return (
		<VStack gap='20'>
			<Text.TitleH2>User Statistics</Text.TitleH2>
			<div className={cls.statistics}>
				{isLoading ? <Loader /> : <Statistics data={data} />}
			</div>
		</VStack>
	)
})
