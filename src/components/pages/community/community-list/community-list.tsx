import React from 'react'
import s from './community-list.module.scss'
import photo from '../../../../images/10.jpg'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Group } from '../../../../types/group'
import { Loader } from '../../../shared/loader/loader'
import { ErrorDisplay } from '../../../shared/error-display/error-display'

type Props = {
  groups: Group[]
  isLoading: boolean
  error: string | null
}

export const CommunityList = observer(({ groups, isLoading, error }: Props) => {

  if (isLoading) return <Loader />
  if (error) return <ErrorDisplay message={'Error'} />

  return (
    <>
      {groups.length === 0
        ?
        <div>
          0 communities
        </div>
        : groups.map(group =>
          <div className={s.card}>
            <img className={s.img} src={photo} alt="photo" />
            <div className={s.info}>
              <NavLink to="/" className={s.title}>{group.title}</NavLink>
              <span>Description: {group.description}</span>
              <button className={s.joinGroup}>Join a group</button>
            </div>
          </div>
        )}
    </>
  )
})