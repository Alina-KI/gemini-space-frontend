import React from 'react'
import s from './comments.module.css'
import ava from '../../../../images/13.jpg'
import image from '../../../../images/ornaments-for-comments/tracery.svg'
import frameTop from '../../../../images/ornaments-for-comments/frame-one.svg'
import frameBottom from '../../../../images/ornaments-for-comments/frame-two.svg'


type Props = {
  text: string
}

export const Comments = (props: Props) => {
  return (
    <div className={s.comments}>
      <img className={s.frame1} src={frameTop} alt="frame" />
      <img className={s.frame2} src={frameBottom} alt="frame" />
      <div className={s.comment}>
        <div className={s.avatar} style={{ backgroundImage: `url("${ava}")` }}/>
        <div className={s.text}>{props.text}</div>
      </div>
      <div className={s.bottomLine}>
        <div className={s.separation}>
          <hr className={s.line} />
          <img className={s.img} src={image} alt="img" />
          <hr className={s.line} />
        </div>
      </div>
    </div>
  )
}