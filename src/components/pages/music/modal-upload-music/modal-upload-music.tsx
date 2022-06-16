import React, { useEffect, useState } from 'react'
import { readFile } from '../../../../functions/read-file'
import s from './modal-upload-music.module.scss'
import { ReactComponent as Cross } from '../../../../images/cross.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SetState } from '../../../../types/set-state'
import { observer } from 'mobx-react-lite'
import { userFilesStore } from '../../../../store/user-files-store'

type audioForm = {
  music: FileList
  title: string
}

type Props = {
  isOpen: boolean
  setIsOpen: SetState<boolean>
}

export const ModalUploadMusic = observer(({ isOpen, setIsOpen }: Props) => {
  const { register, watch, handleSubmit, setValue } = useForm<audioForm>()
  const selectedFile = watch('music')?.[0]
  const [preview, setPreview] = useState('')
  const onSubmit: SubmitHandler<audioForm> = async data => {
    userFilesStore.uploadNewAudio(data.music[0], data.title)
    // @ts-ignore
    setValue('music', '')
    setValue('title', '')
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
            <span className={s.text}>Title audio file</span>
            <input {...register('title')} className={s.title} type="text" placeholder="Title"/>
          </label>
          <label className={s.container}>
            <span className={s.text}>Upload file</span>
            <input {...register('music')} className={s.file} type="file" />
          </label>
          <audio className={s.audio} src={preview} controls/>
          <button className={s.btnSave}>Upload audio file</button>
        </form>
      }
    </>
  )
})