import React, { useEffect, useRef, useState } from 'react'
import { useRefDimensions } from '../../../../hooks/use-ref-dimensions'
import { readFile } from '../../../../functions/read-file'
import s from './modal-upload-image.module.scss'
import { ReactComponent as Cross } from '../../../../images/cross.svg'
import { useHistory } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { authStore } from '../../../../store/auth-store'
import { userPageStore } from '../../../../store/user-page-store'
import { SetState } from '../../../../types/set-state'
import { observer } from 'mobx-react-lite'

type imageForm = {
  image: FileList
}

type Props = {
  isOpen: boolean
  setIsOpen: SetState<boolean>
}

export const ModalUploadImage = observer(({ isOpen, setIsOpen }: Props) => {
  const containerRef = useRef<HTMLImageElement>(null)
  const { height } = useRefDimensions(containerRef)
  const { register, watch, handleSubmit } = useForm<imageForm>()
  const selectedFile = watch('image')?.[0]
  const [preview, setPreview] = useState('')

  const onSubmit: SubmitHandler<imageForm> = async data => {
    await userPageStore.uploadNewAvatar(data.image[0])
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
          <label className={s.containerPhoto} style={preview ? { height: `${height}px` } : {}}>
            <span className={s.textPhoto}>Upload file</span>
            <input {...register('image')} className={s.file} type="file" />
            <img ref={containerRef} className={s.photo} src={preview} alt="" />
          </label>
          <button className={s.btnChange}>Change avatar</button>
        </form>
      }
    </>
  )
})