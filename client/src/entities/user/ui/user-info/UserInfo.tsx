import clsx from 'clsx'

import cls from './UserInfo.module.scss'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { useProfile } from '../../lib/hooks/useProfile/useProfile'

interface UserInfoProps {
	className?: string
}

export const UserInfo = (props: UserInfoProps) => {
	const { className } = props
	const { data, isLoading } = useProfile()

	return (
		<HStack
			className={clsx(cls.UserInfo, [className])}
			gap='12'
			align='center'
		>
			<VStack>
				<Text.BodyL
					align='right'
					sx={{ fontWeight: '500' }}
				>
					{data?.user.name}
				</Text.BodyL>
				<Text.BodyM
					align='right'
					sx={{ fontWeight: '400' }}
				>
					{data?.user.email}
				</Text.BodyM>
			</VStack>
			<Text
				className={cls.avatar}
				sx={{ color: 'on-primary' }}
			>
				{data?.user.name?.charAt(0) || 'A'}
			</Text>
		</HStack>
	)
}
