import React from 'react'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export const Message = () => {
  return (
    <div>
      <ErrorDisplay code={34}
        message={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, ex quasi! Consectetur culpa dolor molestiae nulla. Asperiores, cum earum eius error ipsa ipsam itaque magnam mollitia optio rerum sequi, ut!'}/>
    </div>
  )
}