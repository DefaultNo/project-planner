import clsx from 'clsx'

import cls from './SidebarFooter.module.scss'

import { LogoutButton } from '../logout-button/LogoutButton'

export const SidebarFooter = () => {
	return (
		<div className={clsx(cls.SidebarFooter)}>
			<LogoutButton />
		</div>
	)
}
