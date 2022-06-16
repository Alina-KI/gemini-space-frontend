import React from 'react'
import s from './community-list.module.scss'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Group } from '../../../../types/group'
import { Loader } from '../../../shared/loader/loader'
import { ErrorDisplay } from '../../../shared/error-display/error-display'
import { groupStore } from '../../../../store/group-store'
import { authStore } from '../../../../store/auth-store'
import { groupPageStore } from '../../../../store/group-page-store'

type Props = {
  groups: Group[]
  isLoading: boolean
  error: string | null
  showAddButton: boolean
}

export const CommunityList = observer(({ groups, isLoading, error, showAddButton }: Props) => {

  if (isLoading) return <Loader />
  if (error) return <ErrorDisplay message={'Error'} />

  return (
    <div className={s.container}>
      {groupStore.groups.length === 0
        ?
        <div>
          0 communities
        </div>
        : groups.map(group =>
          <div className={s.card} key={group._id}>
            <img className={s.img} src={group.photo} alt="photo" />
            <div className={s.info}>
              <NavLink
                to={`/${authStore.user?.login}/community/${group._id}`}
                onClick={() => groupPageStore.selectedGroupId = group._id}
                className={s.title}>{group.title}</NavLink>
              <span>Description: {group.description}</span>
              {showAddButton &&
              <button className={s.joinGroup} onClick={() => {
                groupStore.addedMember(group._id).then()
              }}>Join a group</button>
              }
            </div>
          </div>
        )}
    </div>
  )
})