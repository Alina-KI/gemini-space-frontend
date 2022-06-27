import React  from 'react'
import s from './mini-gallery.module.scss'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../../../store/auth-store'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.scss'
import 'swiper/modules/navigation/navigation.scss'
import 'swiper/modules/pagination/pagination.scss'
import 'swiper/modules/effect-flip/effect-flip.scss'
import 'swiper/modules/scrollbar/scrollbar.scss'

export const MiniGallery = () => {
  const user = authStore.user

  return (
    <div className={s.gallery}>
      <NavLink to={`/${user?.login}/gallery`} className={s.whole_gallery}>Gallery</NavLink>
      <Swiper
        spaceBetween={5}
        slidesPerView={4}
        speed={500}
        loop={false}
        effect={'flip'}
      >
        {user?.imageFiles?.map(photo =>
          <SwiperSlide className={s.swiper_slide}>
            <img className={s.gallery_photo} key={photo} src={photo} alt="" />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}