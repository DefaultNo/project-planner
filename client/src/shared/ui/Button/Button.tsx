import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'

import cls from './Button.module.scss'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import { HStack } from '@/shared/ui/Stack'

type ButtonFilledColors =
	| 'primary'
	| 'primary-variant'
	| 'secondary'
	| 'secondary-variant'
	| 'error'
	| 'error-variant'
type ButtonOutlinedColors = 'primary' | 'secondary' | 'error'
type ButtonTextColors = 'primary' | 'error'

type ButtonColorsMap = {
	filled: ButtonFilledColors
	outlined: ButtonOutlinedColors
	text: ButtonTextColors
}

export type ButtonTheme = keyof ButtonColorsMap
type ButtonColor<T extends ButtonTheme> = ButtonColorsMap[T]

type ButtonSize = 'small' | 'medium' | 'large'

const rippleColorsMap: {
	[Theme in ButtonTheme]: Record<ButtonColorsMap[Theme], string>
} = {
	filled: {
		primary: 'var(--on-primary-color)',
		'primary-variant': 'var(--on-primary-container-color)',
		secondary: 'var(--on-secondary-color)',
		'secondary-variant': 'var(--on-secondary-container-color)',
		error: 'var(--on-error-color)',
		'error-variant': 'var(--on-error-container-color)'
	},
	outlined: {
		primary: 'var(--primary-color)',
		secondary: 'var(--primary-color)',
		error: 'var(--on-secondary-container-color)'
	},
	text: {
		primary: 'var(--primary-color)',
		error: 'var(--error-color)'
	}
}

export interface ButtonProps<Theme extends ButtonTheme>
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	children?: ReactNode
	theme?: Theme
	color?: ButtonColor<Theme>
	size?: ButtonSize
	loading?: boolean
	disabled?: boolean
	disableRipple?: boolean
}

export const Button = memo(
	<Theme extends ButtonTheme>(props: ButtonProps<Theme>) => {
		const {
			className,
			children,
			theme,
			color = 'primary',
			size,
			loading,
			disabled,
			disableRipple,
			type = 'button',
			...other
		} = props

		const rippleColor = theme ? rippleColorsMap[theme]?.[color] : undefined

		const additional = [
			className,
			theme && cls[theme],
			color && cls[color],
			size && cls[size]
		]

		const mods = {
			[cls.disabled]: disabled,
			[cls.loading]: loading
		}

		const component = (
			<HStack as='span' align='center' justify='center' gap='8'>
				{children}
				{loading && <span className={cls.loader} />}
			</HStack>
		)

		if (disableRipple) {
			return (
				<button
					type={type}
					className={clsx(cls.Button, mods, additional)}
					disabled={disabled}
					{...other}
				>
					{component}
				</button>
			)
		}

		return (
			<Ripple
				as='button'
				color={rippleColor}
				type={type}
				className={clsx(cls.Button, mods, additional)}
				disabled={disabled}
				{...other}
			>
				{component}
			</Ripple>
		)
	}
)
