import React, { useEffect } from 'react'
import s from './community.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { CommunityList } from './community-list/community-list'
import { groupStore } from '../../../store/group-store'

export const Community = observer(() => {
  const history = useHistory()

  useEffect(() => {
    groupStore.fetchMyGroups().then()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.linkCommunities}>
        <NavLink activeClassName={s.activeLink} className={s.link} to={`/${authStore.user?.login}/community`}>My communities</NavLink>
        <NavLink className={s.link} to='/find-community'>Find communities</NavLink>
        <button onClick={() => history.push(`/${authStore.user?.login}/create-community`)} className={s.createCommunity}>Create community</button>
      </div>
      <CommunityList groups={groupStore.groups} isLoading={groupStore.isLoading} error={null} showAddButton={false}/>
    </div>
  )
})