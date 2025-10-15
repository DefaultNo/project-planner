'use client'

import clsx from 'clsx'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { type ButtonHTMLAttributes, useState } from 'react'
import { DayPicker } from 'react-day-picker'

import cls from './DatePicker.module.scss'
import CalendarIcon from '@/shared/assets/icons/Calendar.svg'
import ChevronLeftIcon from '@/shared/assets/icons/ChevronLeft.svg'
import ChevronRightIcon from '@/shared/assets/icons/ChevronRight.svg'
import { useOutsideClick } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { IconButton } from '@/shared/ui/IconButton/IconButton'

dayjs.extend(localizedFormat)

interface DatePickerProps {
	className?: string
	onChange: (value: string) => void
	value: string
}

const PreviousMonthButton = ({
	onClick
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<IconButton onClick={onClick} theme='standard'>
			<Icon SVG={ChevronLeftIcon} />
		</IconButton>
	)
}

const NextMonthButton = ({
	onClick
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<IconButton onClick={onClick} theme='standard'>
			<Icon SVG={ChevronRightIcon} />
		</IconButton>
	)
}

export const DatePicker = (props: DatePickerProps) => {
	const { className, onChange, value } = props

	const [selected, setSelected] = useState<Date | undefined>(
		value ? new Date(value) : undefined
	)
	const { isShow, setIsShow, ref } = useOutsideClick<HTMLDivElement>()

	const handleDaySelect = (date: Date | undefined) => {
		const ISODate = date?.toISOString()
		setSelected(date)

		if (ISODate) {
			onChange(ISODate)
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	const onOpen = () => setIsShow(!isShow)

	return (
		<div className={clsx(cls.DatePicker, {}, [className])} ref={ref}>
			<Button
				style={{ width: '100%' }}
				size='small'
				theme='text'
				onClick={onOpen}
			>
				<Icon SVG={CalendarIcon} />
				{value ? dayjs(value).format('LL') : 'Click for select'}
			</Button>
			{/*{value && <Button onClick={() => onChange('')}>Close</Button>}*/}
			{isShow && (
				<div className={cls['date-picker']}>
					<DayPicker
						classNames={{
							root: cls['date-picker-root'],
							nav: cls['date-picker-nav'],
							chevron: cls['date-picker-chevron'],
							months: cls['date-picker-months'],
							month: cls['date-picker-month'],
							month_caption: cls['date-picker-month-caption'],
							weekday: cls['date-picker-weekday'],
							week: cls['date-picker-week'],
							day: cls['date-picker-day'],
							day_button: cls['date-picker-day-button'],
							selected: cls['date-picker-selected'],
							disabled: cls['date-picker-disabled']
						}}
						components={{
							NextMonthButton: NextMonthButton,
							PreviousMonthButton: PreviousMonthButton
						}}
						startMonth={new Date()}
						disabled={{
							before: new Date()
						}}
						endMonth={new Date(2055, 12)}
						autoFocus={isShow}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
					/>
				</div>
			)}
		</div>
	)
}
