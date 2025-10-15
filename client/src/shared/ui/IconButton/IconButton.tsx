import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import cls from './IconButton.module.scss'
import { Ripple } from '@/shared/ui/Ripple/Ripple'

type IconButtonTheme = 'standard' | 'filled' | 'tonal' | 'outlined'
type IconButtonSize = 'small' | 'medium' | 'large'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	children: ReactNode
	theme?: IconButtonTheme
	size?: IconButtonSize
	disabled?: boolean
}

export const IconButton = (props: IconButtonProps) => {
	const {
		className,
		children,
		type = 'button',
		theme,
		size,
		disabled,
		...other
	} = props

	const additional = [className, theme && cls[theme], size && cls[size]]

	const mods = {
		[cls.disabled]: disabled
	}

	return (
		<Ripple
			className={clsx(cls.IconButton, mods, additional)}
			as='button'
			type={type}
			center
			{...other}
		>
			{children}
		</Ripple>
	)
}
