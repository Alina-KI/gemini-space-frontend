import React from 'react'
import s from './community.module.scss'
import { NavLink } from 'react-router-dom'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { userStore } from '../../../store/users-store'
import { CommunityList } from './community-list/community-list'

export const Community = observer(() => {
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.container}>
      <div className={s.linkCommunities}>
        <NavLink activeClassName={s.activeLink} className={s.link} to={`/${authStore.user?.login}/community`}>My communities</NavLink>
        <NavLink className={s.link} to="/find-community">Find communities</NavLink>
        <button className={s.createCommunity}>Create community</button>
      </div>
      <CommunityList user={userStore.users} isLoading={userStore.isLoading} error={null} />
    </div>
  )
})