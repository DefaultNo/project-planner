import * as cls from './ToggleButton.module.scss'
import type { ComponentPropsWithoutRef, ReactNode, MouseEvent, KeyboardEvent } from 'react'
import { useCallback, useContext } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { isHotkey } from '@/shared/lib/is-hotkey/isHotkey'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Ripple } from '@/shared/ui/Ripple/Ripple'
import type { ButtonItem } from '../ToggleButtonGroup/ToggleButtonGroup'
import { ToggleGroupContext } from '../ToggleButtonGroup/ToggleButtonGroup'

interface ToggleButtonBase<T extends string> {
    className?: string
    value: T
    children: ReactNode
}

type ToggleButtonProps<T extends string> = ToggleButtonBase<T> & Omit<ComponentPropsWithoutRef<'button'>, keyof ToggleButtonBase<T>>

export const ToggleButton = <T extends string>(props: ToggleButtonProps<T>) => {
    const {
        className,
        value,
        children,
        ...other
    } = props

    const {
        value: selectedValue,
        onChange,
        register,
        deregister,
        getItems,
        focusedValue,
        setFocusedValue,
        onShiftTab,
    } = useContext(ToggleGroupContext)

    const ref = (element: HTMLElement | null) => {
        element != null ? register(value, element) : deregister(value)
    }

    const onClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        onChange(value)
        other.onClick?.(event)
    }, [onChange, other, value])

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (isHotkey('shift+tab', event)) {
            onShiftTab()
        }

        if (isHotkey(['up', 'down'], event)) {
            event.preventDefault()
        }

        const items = getItems()
        let nextItem: ButtonItem<T> | undefined
        const currIndex = items.findIndex(item => item.value === value)

        if (currIndex === -1) {
            nextItem = items.shift()
        } else if (isHotkey(['up', 'right'], event)) {
            nextItem = currIndex === items.length - 1 ? items[0] : items[currIndex + 1]
        } else if (isHotkey(['down', 'left'], event)) {
            nextItem = currIndex === 0 ? items[items.length - 1] : items[currIndex - 1]
        }

        if (nextItem) {
            nextItem.element.focus()
            onChange(nextItem.value)
        }

        other.onKeyDown?.(event)
    }

    const onFocus = () => {
        setFocusedValue(value)
    }

    const mods: Mods = {
        [cls.selected]: selectedValue === value,
    }

    return (
        <Ripple
            as="button"
            className={classNames(cls.ToggleButton, mods, [className])}
            color="var(--primary-color)"
            data-toggle-group-button
            tabIndex={focusedValue === value ? 0 : -1}
            role="radio"
            aria-checked={selectedValue === value}
            ref={ref}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            {...other}
        >
            {children}
        </Ripple>
    )
}
