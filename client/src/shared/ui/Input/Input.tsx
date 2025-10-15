import clsx from 'clsx'
import { FocusEvent, InputHTMLAttributes, forwardRef } from 'react'
import { memo, useEffect, useRef, useState } from 'react'

import { useHover } from '@/shared/lib/hooks'
import cls from '@/shared/ui/Input/Input.module.scss'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>

type InputTheme = 'filled'

export interface InputProps extends HTMLInputProps {
	className?: string
	theme?: InputTheme
	value?: string
	label?: string
	error?: string
	disabled?: boolean
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

const InputLabel = ({ label }: { label?: string | undefined }) => {
	if (label) {
		return <Text.SPAN className={cls.label}>{label}</Text.SPAN>
	}
}

const InputError = ({ error }: { error: string | undefined }) => {
	if (error) {
		return <Text sx={{ color: 'error' }}>{error}</Text>
	}

	return null
}

export const Input = memo(
	forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
		const {
			className,
			theme,
			value,
			label,
			error,
			type = 'text',
			disabled,
			onBlur,
			...other
		} = props

		const wrappedRef = useRef<HTMLDivElement>(null)

		const { isHover } = useHover(wrappedRef)
		const [isFocus, setIsFocus] = useState<boolean>(false)

		const isEmptyValue = (value: string | undefined) => {
			return !value
		}

		const onFocusHandler = () => setIsFocus(true)
		const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
			const targetValue = event.target.value

			if (isEmptyValue(targetValue) || isEmptyValue(value)) {
				setIsFocus(false)
			}

			if (onBlur) {
				onBlur(event)
			}
		}

		useEffect(() => {
			if (!isEmptyValue(value)) {
				setIsFocus(true)
				return
			}

			setIsFocus(false)
		}, [value])

		const mods = {
			[cls.disabled]: disabled,
			[cls.focused]: isFocus,
			[cls.hovered]: isHover,
			[cls['no-label']]: !label
		}

		const additional = [className, theme && cls[theme]]

		return (
			<div className={clsx(cls.Input, mods, additional)}>
				<HStack gap='8' className={cls.fieldMain}>
					<div ref={wrappedRef} className={cls.inner}>
						<InputLabel label={label} />
						<div className={cls.field}>
							<input
								ref={ref}
								className={cls.input}
								onFocus={onFocusHandler}
								onBlur={onBlurHandler}
								type={type}
								value={value}
								readOnly={disabled}
								{...other}
							/>
						</div>
					</div>
				</HStack>
				<InputError error={error} />
			</div>
		)
	})
)
