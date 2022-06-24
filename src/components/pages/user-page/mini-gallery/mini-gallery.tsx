import React  from 'react'
import s from './mini-gallery.module.scss'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../../../store/auth-store'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'

export const MiniGallery = () => {
  const user = authStore.user

  return (
    <div className={s.gallery}>
      <NavLink to={`/${user?.login}/gallery`} className={s.whole_gallery}>Gallery</NavLink>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={4}
        pagination navigation scrollbar
      >
        {user?.imageFiles?.slice(user?.imageFiles?.length - 4).map(photo =>
          <SwiperSlide className={s.swiper_slide}>
            <img className={s.gallery_photo} key={photo} src={photo} alt="" />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}