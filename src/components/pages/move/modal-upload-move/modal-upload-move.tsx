import React, { useEffect, useState } from 'react'
import { readFile } from '../../../../functions/read-file'
import s from './modal-upload-move.module.scss'
import { ReactComponent as Cross } from '../../../../images/cross.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SetState } from '../../../../types/set-state'
import { observer } from 'mobx-react-lite'
import { userFilesStore } from '../../../../store/user-files-store'

type videoForm = {
  video: FileList
}

type Props = {
  isOpen: boolean
  setIsOpen: SetState<boolean>
}

export const ModalUploadMove = observer(({ isOpen, setIsOpen }: Props) => {
  const { register, watch, handleSubmit } = useForm<videoForm>()
  const selectedFile = watch('video')?.[0]
  const [preview, setPreview] = useState('')
  const onSubmit: SubmitHandler<videoForm> = async data => {
    userFilesStore.uploadNewVideo(data.video[0])
    setIsOpen(false)
  }
  useEffect(() => {
    if (selectedFile) {
      readFile(selectedFile).then(setPreview)
    }
  }, [selectedFile])

  return (
    <>
      {
        isOpen &&
        <form action="" className={s.formImage} onSubmit={handleSubmit(onSubmit)}>
          <button type="button" className={s.crossClose} onClick={() => {
            setIsOpen(false)
          }}>
            <Cross className={s.crossPhotoClose} />
          </button>
          <label className={s.container}>
            <span className={s.text}>Upload file</span>
            <input {...register('video')} className={s.file} type="file" />
          </label>
          <video className={s.move} src={preview} controls title='jk'/>
          <button className={s.btnSave}>Upload video file</button>
        </form>
      }
    </>
  )
})