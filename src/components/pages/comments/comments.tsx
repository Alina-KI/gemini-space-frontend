import React, { useEffect, useRef, useState } from 'react'
import s from './comments.module.scss'
import ava from '../../../images/13.jpg'
import { ReactComponent as Tracery } from '../../../images/ornaments-for-comments/tracery.svg'
import frameTop from '../../../images/ornaments-for-comments/frame-one.svg'
import frameBottom from '../../../images/ornaments-for-comments/frame-two.svg'


type Props = {
  text: string
}

export const Comments = (props: Props) => {
  const [isActive, setIsActive] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflowText, setIsOverflowText] = useState(true)

  useEffect(() => {
    setIsOverflowText(textRef.current!.clientHeight < textRef.current!.scrollHeight)
  }, [textRef.current?.clientHeight])


  const toggleIsActive = () => setIsActive(isActive => !isActive)

  return (
    <div className={s.comments}>
      <img className={s.frame1} src={frameTop} alt="frame" />
      <img className={s.frame2} src={frameBottom} alt="frame" />
      <div className={s.comment}>
        <div className={s.avatar} style={{ backgroundImage: `url("${ava}")` }} />
        <div className={`${s.text}`}>
          <p ref={textRef} className={`${s.textContent} ${isActive && s.text_active}`}>
            {props.text}
          </p>
        </div>
      </div>
      {isOverflowText && <div onClick={toggleIsActive} className={s.showMore}>{isActive ? 'Hide' : 'Show more'}</div>}
      <div className={s.bottomLine}>
        <div className={s.separation}>
          <hr className={s.line} />
          <Tracery className={s.tracery}/>
          <hr className={s.line} />
        </div>
      </div>
    </div>
  )
}