import React, { useState } from 'react'
import s from './gallery.module.scss'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { observer } from 'mobx-react-lite'
import { ModalUploadImageForGallery } from './modal-upload-image-for-gallery/modal-upload-image-for-gallery'
import { authStore } from '../../../store/auth-store'


export const Gallery = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.gallery}>
      <div className={s.hed}>
        <h1 className={s.title}>Gallery</h1>
        <button className={s.addedPhoto} onClick={() => setIsOpenModal(true)}>+</button>
      </div>
      <ModalUploadImageForGallery isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <div className={s.container}>
        {authStore.user?.imageFiles?.map(image =>
          <span className={s.content} key={image}>
            <img className={s.image} src={image} alt="img" />
          </span>
        )}        
      </div>
    </div>
  )
})

