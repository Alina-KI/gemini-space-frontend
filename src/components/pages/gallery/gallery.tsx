import React from 'react'
import s from './gallery.module.scss'
import picture1 from '../../../images/1.jpg'
import picture2 from '../../../images/18.jpg'
import picture3 from   '../../../images/2.jpg'
import picture4 from   '../../../images/11.jpg'
import picture5 from   '../../../images/3.jpg'
import picture6 from   '../../../images/10.jpg'
import picture7 from   '../../../images/4.jpg'
import picture8 from   '../../../images/9.jpg'
import picture9 from   '../../../images/5.jpg'
import picture10 from   '../../../images/8.jpg'
import picture11 from   '../../../images/12.jpg'
import picture12 from   '../../../images/15.jpg'
import picture13 from   '../../../images/16.jpg'
import picture14 from   '../../../images/17.jpg'
import picture15 from   '../../../images/13.jpg'
import picture16 from   '../../../images/14.jpg'
import picture17 from   '../../../images/6.jpg'
import picture18 from   '../../../images/7.jpg'


export const Gallery = () => {
  return (
    <div>
      <h1>Gallery</h1>
      <div className={s.container}>
        {/*{images.map(value => {*/}
        {/*  console.log(value)*/}
        {/*  return(*/}
        {/*    <div className={s.content} key={value}>*/}
        {/*      <div className={s.image} style={{ backgroundImage: `url(${value})` }}/>*/}
        {/*      <div className={s.image}> </div>*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*})}*/}
        <span className={s.content}>
          <img className={s.image} src={picture1} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture2} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture3} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture4} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture5} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture6} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture7} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture8} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture9} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture10} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture11} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture12} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture13} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture14} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture15} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture16} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture17} alt="img" />
        </span>
        <span className={s.content}>
          <img className={s.image} src={picture18} alt="img" />
        </span>
      </div>
    </div>
  )
}

