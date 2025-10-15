import cls from './StatisticaItem.module.scss'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

interface StatisticalItemProps {
	label: string
	value: string | number
}

export const StatisticalItem = (props: StatisticalItemProps) => {
	const { label, value } = props
	return (
		<VStack
			className={cls.StatisticalItem}
			gap='8'
			justify='space-between'
			align='center'
		>
			<Text.TitleH3 align='center'>{label}</Text.TitleH3>
			<Text sx={{ fontSize: 'headline-m', fontWeight: '600' }} align='center'>
				{value}
			</Text>
		</VStack>
	)
}
