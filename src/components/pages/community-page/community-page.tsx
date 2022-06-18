import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './community-page.module.scss'
import { groupPageStore } from '../../../store/group-page-store'
import { NavLink, useParams } from 'react-router-dom'
import { groupStore } from '../../../store/group-store'
import { PostPage } from '../post-page/post-page'
import { FormPosts } from '../form-posts/form-posts'
import { toJS } from 'mobx'

export const CommunityPage = observer(() => {
  const { communityId } = useParams<{ communityId: string }>()

  useEffect(() => {
    groupPageStore.selectedGroupId = communityId
    groupStore.fetchMyGroups().then()
    console.log(toJS(groupPageStore.posts))
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
      {groupPageStore.isCreator && <FormPosts isPostGroups={true}/>}
      {groupPageStore.posts.map(post => <PostPage {...post} key={post._id} />)}
    </div>
  )
})