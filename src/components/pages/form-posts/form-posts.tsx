import React from 'react'
import s from './posr-posts.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postStore } from '../../../store/post-store'
import { observer } from 'mobx-react-lite'

type createPost = {
  title: string
  text: string
  datePublished: string
}

type Props = {
  isPostGroups: boolean
}

export const FormPosts = observer((props: Props) => {
  const { register, handleSubmit, setValue } = useForm<createPost>()
  const onSubmit: SubmitHandler<createPost> = data => {
    data.datePublished = Date.now().toString()
    if (props.isPostGroups) {
      postStore.createPostCommunity(data).then()
    }
    else{
      postStore.createPostUser(data).then()
    }
    setValue('title', '')
    setValue('text', '')
  }
  return (
    <form className={s.containerForPublish} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.containerTitle}>
        <span className={s.spanPublish}>Title:</span>
        <input className={s.titlePublish} {...register('title')} type="text" />
      </div>
      <textarea {...register('text')} className={s.textPublish} cols={30} rows={10} accessKey="s" />
      <button className={s.buttonPublish}>Publish post</button>
    </form>
  )
})