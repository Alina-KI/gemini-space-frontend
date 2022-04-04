import { RefObject, useEffect, useState } from 'react'

export const useRefDimensions = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 })

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0]
      const size = entry.borderBoxSize[0]

      const width = size.inlineSize
      const height = size.blockSize

      setDimensions({
        width,
        height
      })
    })

    resizeObserver.observe(ref.current as Element)
  }, [])

  return dimensions
}