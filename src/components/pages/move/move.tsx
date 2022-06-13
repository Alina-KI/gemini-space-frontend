import React, { useState } from 'react'
import s from './move.module.scss'
import { authStore } from '../../../store/auth-store'
import { ModalUploadMove } from './modal-upload-move/modal-upload-move'
import { observer } from 'mobx-react-lite'

export const Move = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div className={s.container}>
      <button onClick={() => setIsOpenModal(true)} className={s.modalShow}>Added move</button>
      <div className={s.containerMove}>
        {authStore.user?.videoFiles?.map(video =>
          <video className={s.move} src={video} controls key={video}/>
        )}
      </div>
      <ModalUploadMove isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
    </div>
  )
})