import clsx from 'clsx'
import { MouseEvent } from 'react'

import cls from './Select.module.scss'
import XIcon from '@/shared/assets/icons/X.svg'
import { useOutsideClick } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { HStack } from '@/shared/ui/Stack'

export interface SelectOption {
	label: string
	value: string
	color?: string
}

interface SelectProps {
	className?: string
	label?: string
	data: SelectOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export const Select = (props: SelectProps) => {
	const { className, data, onChange, value, isColorSelect, label } = props

	const { isShow, setIsShow, ref } = useOutsideClick<HTMLDivElement>(false)

	const getLabel = () => data.find(item => item.value === value)?.label
	const getColor = () => data.find(item => item.value === value)?.color

	const onButtonClick = (event: MouseEvent) => {
		event.preventDefault()
		setIsShow(!isShow)
	}

	const onClear = (event: MouseEvent) => {
		event.preventDefault()
		onChange('')
	}

	const onChangeOption = (value: string) => {
		onChange(value)
		setIsShow(false)
	}

	return (
		<div className={clsx(cls.Select, {}, [className])} ref={ref}>
			<HStack className={cls.trigger} gap='4' align='center'>
				<HStack flexGrow={1}>
					<Button
						style={{ width: '100%' }}
						size='small'
						theme='text'
						onClick={onButtonClick}
					>
						{getColor() && (
							<span
								className={cls.badge}
								style={isColorSelect ? { backgroundColor: getColor() } : {}}
							></span>
						)}
						{getLabel() ? (
							<span>{getLabel()}</span>
						) : label ? (
							<span>{label}</span>
						) : (
							<span>Select</span>
						)}
					</Button>
				</HStack>
				{value && (
					<IconButton size='small' theme='standard' onClick={onClear}>
						<Icon SVG={XIcon} />
					</IconButton>
				)}
			</HStack>
			{isShow && (
				<div className={cls.list}>
					{data.map(item => (
						<Button
							className={cls.option}
							theme='text'
							key={item.value}
							onClick={() => onChangeOption(item.value)}
						>
							{isColorSelect && (
								<span
									style={isColorSelect ? { background: item.color } : {}}
									className={cls.badge}
								></span>
							)}
							{item.label}
						</Button>
					))}
				</div>
			)}
		</div>
	)
}
