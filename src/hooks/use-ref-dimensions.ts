import { RefObject, useEffect, useMemo, useState } from 'react'

export const useRefDimensions = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 })
  const resizeObserver = useMemo(() => new ResizeObserver(entries => {
    const entry = entries[0]
    const size = entry.borderBoxSize[0]

    const width = size.inlineSize
    const height = size.blockSize

    setDimensions({
      width,
      height
    })
  }), [])

  useEffect(() => {
    resizeObserver.disconnect()
    if (ref.current) {
      resizeObserver.observe(ref.current as Element)
    }
  }, [ref.current])

  return dimensions
}