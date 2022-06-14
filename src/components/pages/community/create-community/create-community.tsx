import React, { useEffect, useRef, useState } from 'react'
import s from './create-community.module.scss'
import { useRefDimensions } from '../../../../hooks/use-ref-dimensions'
import { observer } from 'mobx-react-lite'
import { readFile } from '../../../../functions/read-file'
import { SubmitHandler, useForm } from 'react-hook-form'

type createCommunityForm = {
  image: FileList
  title: string
  description: string
}

export const CreateCommunity = observer(() => {
  const containerRef = useRef<HTMLImageElement>(null)
  const { height } = useRefDimensions(containerRef)
  const [preview, setPreview] = useState('')
  const { register, watch, handleSubmit } = useForm<createCommunityForm>()
  const selectedFile = watch('image')?.[0]
  const onSubmit: SubmitHandler<createCommunityForm> = async data => {

  }
  useEffect(() => {
    readFile(selectedFile).then(setPreview)
  }, [selectedFile])

  return (
    <form action="" className={s.formCommunity} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.downlandPhoto}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <label className={s.containerPhoto} style={preview ? { height: `${height}px` } : {}}>
          <i className="material-icons">attach_file</i>
          <span className={s.textPhoto}>Загрузить файл</span>
          <input {...register('image')} className={s.file} type="file" />
          <img ref={containerRef} className={s.photo} src={preview} alt="" />
        </label>
      </div>
      <div className={`${s.container} ${s.titleText}`}>
        <p className={s.title}>Title group:</p>
        <input {...register('title')} className={s.text} type="text" />
      </div>
      <div className={`${s.container} ${s.descriptionText}`}>
        <p className={s.title}>Description:</p>
        <textarea {...register('description')} className={s.text} cols={30} rows={10} accessKey='s'/>
      </div>
      <button className={s.btnCommunity}>Create group</button>
    </form>
  )
})