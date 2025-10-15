import clsx from 'clsx'
import type { CSSProperties, FC, SVGProps } from 'react'
import { memo, useMemo } from 'react'

import cls from './Icon.module.scss'

type IconSize = 'small' | 'medium' | 'large'
type IconColor =
	| 'primary'
	| 'primary-container'
	| 'secondary'
	| 'secondary-container'
	| 'tertiary'
	| 'tertiary-container'
	| 'error'
	| 'error-container'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
	className?: string
	size?: IconSize
	color?: { fill?: IconColor; stroke?: IconColor }
	width?: string
	height?: string
	SVG: FC<SVGProps<SVGSVGElement>>
}

export const Icon = memo((props: IconProps) => {
	const { className, SVG, color, size, width, height, ...restProps } = props

	const style: CSSProperties = useMemo(() => {
		return {
			width,
			height,
			flexBasis: width
		}
	}, [width, height])

	const additional = [
		className,
		size && !width && !height ? cls[size] : null,
		color?.fill && cls[`fill-${color.fill}`],
		color?.stroke && cls[`stroke-${color.stroke}`]
	]

	return (
		<SVG
			className={clsx(cls.Icon, {}, additional)}
			style={{ ...style }}
			{...restProps}
		/>
	)
})
