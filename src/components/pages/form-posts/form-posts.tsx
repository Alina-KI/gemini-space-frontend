import React, { useEffect, useRef, useState } from 'react'
import s from './form-posts.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postStore } from '../../../store/post-store'
import { observer } from 'mobx-react-lite'
import { useRefDimensions } from '../../../hooks/use-ref-dimensions'
import { readFile } from '../../../functions/read-file'

type createPost = {
  title: string
  text: string
  datePublished: string
  image: FileList
}

type Props = {
  isPostGroups: boolean
}

export const FormPosts = observer((props: Props) => {
  const containerRef = useRef<HTMLImageElement>(null)
  const { height } = useRefDimensions(containerRef)
  const [preview, setPreview] = useState('')
  const { register, watch, handleSubmit, setValue } = useForm<createPost>()
  const selectedFile = watch('image')?.[0]
  const onSubmit: SubmitHandler<createPost> = data => {
    data.datePublished = Date.now().toString()
    if (props.isPostGroups) {
      postStore.createPostCommunity(data.title, data.text, data.datePublished, data.image[0]).then()
    }
    else{
      postStore.createPostUser(data.title, data.text, data.datePublished, data.image[0]).then()
    }
    setValue('title', '')
    setValue('text', '')
    // @ts-ignore
    setValue('image', '')
  }

  useEffect(() => {
    readFile(selectedFile).then(setPreview)
  }, [selectedFile])

  return (
    <form className={s.containerForPublish} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.containerData}>
        <div className={s.containerTitle}>
          <span className={s.spanPublish}>Title:</span>
          <input className={s.titlePublish} {...register('title')} type="text" />
        </div>
        <textarea {...register('text')} className={s.textPublish} cols={30} rows={10} accessKey="s" />
        <button className={s.buttonPublish}>Publish post</button>
      </div>
      <div className={s.downlandPhoto}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <label className={s.containerPhoto} style={preview ? { height: `${height}px` } : {}}>
          <i className="material-icons">attach_file</i>
          <span className={s.textPhoto}>Upload file</span>
          <input {...register('image')} className={s.file} type="file" />
          <img ref={containerRef} className={s.photo} src={preview} alt="" />
        </label>
      </div>
    </form>
  )
})