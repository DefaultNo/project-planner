import clsx from 'clsx'
import { useRef, useState } from 'react'
import { Transition } from 'react-transition-group'

import cls from './Ripple.module.scss'

export interface RippleItemProps {
	rippleX: number
	rippleY: number
	rippleSize: number
	color: string
	timeout: { enter: number; exit: number }
}

export const RippleItem = (props: RippleItemProps) => {
	const { rippleX, rippleY, rippleSize, color, timeout, ...other } = props

	const nodeRef = useRef(null)

	const [entering, setEntering] = useState<boolean>(false)
	const [exiting, setExiting] = useState<boolean>(false)

	const onEnter = () => setEntering(true)
	const onExit = () => setExiting(true)

	const enteringMods = {
		[cls.entering]: entering
	}

	const exitingMods = {
		[cls.exiting]: exiting
	}

	return (
		<Transition
			onEnter={onEnter}
			onExit={onExit}
			timeout={timeout}
			nodeRef={nodeRef}
			{...other}
		>
			<span
				className={clsx(cls.wrapper, exitingMods, [])}
				ref={nodeRef}
				style={{ animationDuration: `${timeout.exit}ms` }}
			>
				<span
					className={clsx(cls.item, enteringMods, [])}
					style={{
						width: rippleSize,
						height: rippleSize,
						top: rippleY - rippleSize / 2,
						left: rippleX - rippleSize / 2,
						backgroundColor: color,
						animationDuration: `${timeout.enter}ms`
					}}
				></span>
			</span>
		</Transition>
	)
}
