import React, { useState } from 'react'
import s from './music.module.scss'
import { authStore } from '../../../store/auth-store'
import { ModalUploadMusic } from './modal-upload-music/modal-upload-music'
import { observer } from 'mobx-react-lite'

export const Music = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [path, setPath] = useState('#')

  return (
    <div className={s.container}>
      <div className={s.modalAndAudio}>
        <audio className={s.audio} src={path} controls/>
        <button onClick={() => setIsOpenModal(true)} className={s.modalShow}>Added audio</button>
      </div>
      {authStore.user?.audioFiles?.map(music =>
        <div className={s.file} key={music.path}>
          <div className={s.fileTitle}>{music.title}</div>
          <button className={s.fileOn} onClick={() => {
            setPath(music.path)
          }}>Play</button>
        </div>
      )}
      <ModalUploadMusic isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
    </div>
  )
})