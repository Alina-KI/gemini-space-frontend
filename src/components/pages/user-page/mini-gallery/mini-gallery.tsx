import React, { useRef } from 'react'
import s from './mini-gallery.module.scss'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../../../store/auth-store'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.scss'
import SwiperCore, { Navigation } from 'swiper'
import { ReactComponent as LeftLine } from '../../../../images/swiper/left.svg'
import { ReactComponent as RightLine } from '../../../../images/swiper/right.svg'

SwiperCore.use([Navigation])


export const MiniGallery = () => {
  const user = authStore.user
  const navigationPrevRef = useRef<HTMLDivElement>(null)
  const navigationNextRef = useRef<HTMLDivElement>(null)

  return (
    <div className={s.gallery}>
      <NavLink to={`/${user?.login}/gallery`} className={s.whole_gallery}>Gallery</NavLink>
      <div className={s.swiperContainer}>
        <div ref={navigationPrevRef} className={s.swiper_button_prev}>
          <LeftLine className={s.left} />
        </div>
        <Swiper
          spaceBetween={5}
          slidesPerView={5}
          speed={500}
          navigation={{
            prevEl: navigationPrevRef.current!,
            nextEl: navigationNextRef.current!
          }}
          onInit={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = navigationPrevRef.current!
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = navigationNextRef.current!
          }}
        >
          {user?.imageFiles?.map(photo =>
            <SwiperSlide className={s.swiper_slide}>
              <img className={s.gallery_photo} key={photo} src={photo} alt="" />
            </SwiperSlide>
          )}
        </Swiper>
        <div ref={navigationNextRef} className={s.swiper_button_next}>
          <RightLine className={s.right} />
        </div>
      </div>
    </div>
  )
}