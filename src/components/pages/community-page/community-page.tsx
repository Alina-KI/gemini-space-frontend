import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Comments } from '../comments/comments'
import s from './community-page.module.scss'
import { useForm } from 'react-hook-form'
import { groupPageStore } from '../../../store/group-page-store'
import { NavLink, useParams } from 'react-router-dom'
import { groupStore } from '../../../store/group-store'

type createPost = {
  title: string
  text: string
}

export const CommunityPage = observer(() => {
  const { register, handleSubmit } = useForm<createPost>()
  const { communityId } = useParams<{ communityId: string }>()

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
          <NavLink to={`/${groupPageStore.group?.creator}`} className={s.creator}>Creator:{groupPageStore.group?.creator}</NavLink>
        </div>
        <img className={s.photoGroup} src={groupPageStore.group?.photo} alt="Photo" />
      </div>
      {groupPageStore.isCreator &&
      <form className={s.containerForPublish}>
        <div className={s.containerTitle}>
          <span className={s.spanPublish}>Title:</span>
          <input className={s.titlePublish} {...register('title')} type="text" />
        </div>
        <textarea {...register('text')} className={s.textPublish} cols={30} rows={10} accessKey="s" />
        <button className={s.buttonPublish}>Publish post</button>
      </form>
      }
      {groupPageStore.posts.map(post =>
        <div className={s.containerPost}>
          <div className={s.titlePost}>{post.title}</div>
          <div className={s.textPost}>{post.text}</div>
          <div className={s.datePost}>{post.datePublished}</div>
          <div className={s.userPost}>{post.user}</div>
          <div className={s.likesPost}>{post.likes}</div>
          {post.comments.map(comment =>
            <Comments {...comment} />
          )}
        </div>
      )}
    </div>
  )
})