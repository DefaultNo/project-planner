import { FC, SVGProps } from 'react'

export interface DashboardSidebarItem {
	name: string
	path: string
	icon?: FC<SVGProps<SVGElement>>
}
