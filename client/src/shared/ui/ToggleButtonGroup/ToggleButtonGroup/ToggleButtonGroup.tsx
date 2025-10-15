import type { ComponentPropsWithoutRef, ReactNode, FocusEvent } from 'react'
import { useMemo, useRef, useState, useCallback, createContext } from 'react'

interface ToggleGroupContextBase<T extends string> {
    value: T | null
    onChange: (value: T) => void
    register: (value: T, element: HTMLElement) => void
    deregister: (value: T) => void
    getItems: () => ButtonItem<T>[]
    setFocusedValue: (id: T) => void
    focusedValue: T | null
    onShiftTab: () => void
}

export const ToggleGroupContext = createContext<ToggleGroupContextBase<any>>({
    value: null,
    onChange: () => {},
    register: () => {},
    deregister: () => {},
    getItems: () => [],
    setFocusedValue: () => {},
    focusedValue: null,
    onShiftTab: () => {},
})

type PropsWithLabelBy = {
    ['aria-labelledby']: string
}

type PropsWithLabel = {
    ['aria-label']: string
}

export type ButtonItem<T extends string> = { value: T, element: HTMLElement }

interface ToggleGroupRootBase<T extends string> {
    children: ReactNode | ReactNode[]
    value: T | null
    onChange: (value: T) => void
}

type ToggleGroupRootProps<T extends string> = (PropsWithLabel | PropsWithLabelBy)
  & ToggleGroupRootBase<T>
  & Omit<ComponentPropsWithoutRef<'div'>, keyof ToggleGroupRootBase<T>>

export const ToggleButtonGroup = <T extends string>(props: ToggleGroupRootProps<T>) => {
    const {
        children,
        value,
        onChange,
        ...other
    } = props

    const ref = useRef<HTMLDivElement>(null)
    const elements = useRef<Map<T, HTMLElement>>(new Map())
    const [focusedValue, setFocusedValue] = useState<T | null>(value)
    const [isShiftTabbing, setIsShiftTabbing] = useState<boolean>(false)

    const getItems = useCallback(() => {
        if (!ref.current) return []

        const domElements = Array.from(ref.current.querySelectorAll('[data-toggle-group-button]'))

        return Array.from(elements.current)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([value, element]) => ({ value, element }))
    }, [])

    const providerValue = useMemo(() => ({
        value,
        onChange: onChange as (value: T) => void,
        getItems,
        focusedValue,
        register: (value: T, element: HTMLElement) => {
            elements.current.set(value, element)
        },
        deregister: (value: T) => {
            elements.current.delete(value)
        },
        setFocusedValue: (id: T) => {
            setFocusedValue(id)
        },
        onShiftTab: () => {
            setIsShiftTabbing(true)
        },
    }), [value, onChange, getItems, focusedValue])

    const onFocus = (event: FocusEvent) => {
        if (event.target !== event.currentTarget) return
        const orderedItems = getItems()

        if (value) {
            elements.current.get(value)?.focus()
        } else {
            orderedItems.at(0)?.element.focus()
        }
    }

    const onBlur = () => setIsShiftTabbing(false)

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div
                ref={ref}
                role="radiogroup"
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={onFocus}
                onBlur={onBlur}
                {...other}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    )
}
