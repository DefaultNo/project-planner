import { useEffect, useRef, useState } from 'react'

export const useOutsideClick = <T extends HTMLElement>(isVisible?: boolean) => {
	const [isShow, setIsShow] = useState<boolean>(isVisible || false)
	const ref = useRef<T>(null)

	const onClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', onClickOutside)

		return () => {
			document.removeEventListener('click', onClickOutside)
		}
	}, [])

	return { ref, isShow, setIsShow }
}
