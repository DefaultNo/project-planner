import clsx from 'clsx'

import cls from './Checkbox.module.scss'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import { Text } from '@/shared/ui/Text/Text'

interface CheckboxProps {
	className?: string
	id: string
	name: string
	checked: boolean | undefined
	onChange: (value: boolean) => void
	label?: string
}

export const Checkbox = (props: CheckboxProps) => {
	const { className, id, name, checked, onChange, label } = props

	const onChangeHandler = () => {
		onChange(!checked)
	}

	const mods = {
		[cls.checked]: checked
	}

	return (
		<label className={clsx(cls.Checkbox, mods, [className])}>
			<Ripple as='span' color='var(--primary-color)' className={cls.inner}>
				<input
					className={cls.input}
					id={id}
					name={name}
					type='checkbox'
					checked={checked}
					onChange={onChangeHandler}
				/>
				<span className={cls.custom}></span>
			</Ripple>
			<Text.SPAN>{label}</Text.SPAN>
		</label>
	)
}
