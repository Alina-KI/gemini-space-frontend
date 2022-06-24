import React from 'react'
import s from './setting.module.scss'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export const Setting = observer(() => {
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.setting}>
      {/*Setting*/}
      {/*<ErrorDisplay message="Internal Server Error" code={500}/>*/}

      <Swiper pagination navigation scrollbar>
        <SwiperSlide className={s.swiper_slide}>Slide 1</SwiperSlide>
        <SwiperSlide className={s.swiper_slide}>Slide 2</SwiperSlide>
        <SwiperSlide className={s.swiper_slide}>Slide 3</SwiperSlide>
      </Swiper>

    </div>
  )
})