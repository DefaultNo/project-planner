import clsx from 'clsx'

import cls from './Loader.module.scss'

type LoaderPosition = 'start' | 'center' | 'end'

interface LoaderProps {
	className?: string
	position?: LoaderPosition
}

export const Loader = (props: LoaderProps) => {
	const { className, position = 'center' } = props

	const mods = {
		[cls[position]]: position
	}

	return (
		<div className={clsx(cls.Loader, mods, [className])}>
			<span className={cls.inner}></span>
		</div>
	)
}
