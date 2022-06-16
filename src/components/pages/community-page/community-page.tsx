import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './community-page.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { groupPageStore } from '../../../store/group-page-store'
import { NavLink, useParams } from 'react-router-dom'
import { groupStore } from '../../../store/group-store'
import { CommunityPost } from './community-post'

type createPost = {
  title: string
  text: string
  datePublished: string
}

export const CommunityPage = observer(() => {
  const { register, handleSubmit, setValue } = useForm<createPost>()
  const { communityId } = useParams<{ communityId: string }>()
  const onSubmit: SubmitHandler<createPost> = data => {
    data.datePublished = Date.now().toString()
    groupPageStore.createPost(data).then()
    setValue('title', '')
    setValue('text', '')
  }

  useEffect(() => {
    groupPageStore.selectedGroupId = communityId
    groupStore.fetchMyGroups().then()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.containerGroup}>
        <div className={s.containerData}>
          <h2 className={s.title}>{groupPageStore.group?.title}</h2>
          <div className={s.description}>Description: {groupPageStore.group?.description}</div>
          <NavLink to={`/${groupPageStore.group?.creator}`} className={s.creator}>
            Creator: {groupPageStore.group?.creator}
          </NavLink>
        </div>
        <img className={s.photoGroup} src={groupPageStore.group?.photo} alt="Photo" />
      </div>
      {groupPageStore.isCreator &&
      <form className={s.containerForPublish} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.containerTitle}>
          <span className={s.spanPublish}>Title:</span>
          <input className={s.titlePublish} {...register('title')} type="text" />
        </div>
        <textarea {...register('text')} className={s.textPublish} cols={30} rows={10} accessKey="s" />
        <button className={s.buttonPublish}>Publish post</button>
      </form>
      }
      {groupPageStore.posts.map(post => <CommunityPost {...post} key={post._id} />)}
    </div>
  )
})