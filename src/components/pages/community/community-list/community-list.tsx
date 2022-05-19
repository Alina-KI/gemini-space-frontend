import React from 'react'
import s from './community-list.module.scss'
import photo from '../../../images/11.jpg'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { User } from '../../../../types/user'

type Props = {
  user: User[]
  isLoading: boolean
  error: string | null
}

export const CommunityList = observer(({ user, isLoading, error }: Props) => {

  return (
    <div className={s.card}>
      <img className={s.img} src={photo} alt="photo" />
      <div className={s.info}>
        <NavLink to="/" className={s.title}>Req Still</NavLink>
        <span>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        <button className={s.joinGroup}>Join a group</button>
      </div>
    </div>
  )
})