import { useCallback, useRef } from 'react'

// eslint-disable-next-line
export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>()

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => func(...args), delay)
    },
    [func, delay]
  )

  return debounce
}
