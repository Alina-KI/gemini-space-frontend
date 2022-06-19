import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './community-page.module.scss'
import { postStore } from '../../../store/post-store'
import { NavLink, useParams } from 'react-router-dom'
import { groupStore } from '../../../store/group-store'
import { PostPage } from '../post-page/post-page'
import { FormPosts } from '../form-posts/form-posts'

export const CommunityPage = observer(() => {
  const { communityId } = useParams<{ communityId: string }>()

  useEffect(() => {
    postStore.selectedGroupId = communityId
    groupStore.fetchMyGroups().then()
    postStore.fetchPostsCommunity().then()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.containerGroup}>
        <div className={s.containerData}>
          <h2 className={s.title}>{postStore.group?.title}</h2>
          <div className={s.description}>Description: {postStore.group?.description}</div>
          <NavLink to={`/${postStore.group?.creator}`} className={s.creator}>
            Creator: {postStore.group?.creator}
          </NavLink>
        </div>
        <img className={s.photoGroup} src={postStore.group?.photo} alt="Photo" />
      </div>
      {postStore.isCreator && <FormPosts isPostGroups={true}/>}
      {postStore.posts.map(post => <PostPage {...post} isPostGroups={true} key={post._id} />)}
    </div>
  )
})