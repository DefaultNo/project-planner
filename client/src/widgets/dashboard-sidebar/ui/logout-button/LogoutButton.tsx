import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authService } from '@/features/auth'
import Logout from '@/shared/assets/icons/Logout.svg'
import { AppRoutes } from '@/shared/config/pages-url.config'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'

export const LogoutButton = () => {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push(AppRoutes.AUTH)
	})

	return (
		<Button
			style={{ width: '100%' }}
			theme='text'
			color='error'
			onClick={() => mutate()}
		>
			<Icon SVG={Logout} />
			Logout
		</Button>
	)
}
