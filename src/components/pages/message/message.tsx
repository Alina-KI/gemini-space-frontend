import React from 'react'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export const Message = () => {
  return (
    <div>
      <ErrorDisplay code={502}
        message={'Bad request'}/>
    </div>
  )
}