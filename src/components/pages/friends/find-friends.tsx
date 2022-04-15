import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import s from './friends.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import avatar1 from '../../../images/11.jpg'
import { dialogsStore } from '../../../store/dialogs-store'
import { userStore } from '../../../store/users-store'

export const FindFriends = observer(() => {

  const history = useHistory()

  useEffect(() => {
    userStore.fetchNotMyFriends().then()
  }, [])

  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'} />

  const user = authStore.user

  const writeMessage = (dialogId: string) => {
    dialogsStore.createDialog({ anotherUserId: dialogId })
      .then(() => history.push(dialogId))
  }

  return (
    <div className={s.container}>
      <div className={s.linkFriends}>
        <NavLink className={s.link} to={`/${user?.login}/friends`}>Friends</NavLink>
        <NavLink className={s.link} to="/find-friends">Find friends</NavLink>
      </div>

      {userStore.users.map(user => <div className={s.card}>
        <img className={s.img} src={avatar1} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
          <button onClick={() => userStore.addToFriends(user)} className={s.addFriend}>Add friends</button>
          <button onClick={() => writeMessage('2')} className={s.addFriend}>Write message</button>
        </div>
      </div>)}
    </div>
  )
})


//<div className={s.card}>
//         <img className={s.img} src={avatar1} alt="avatar" />
//         <div className={s.info}>
//           <span>Req Still</span>
//           <span>Date of Birth: 25.12.2000</span>
//           <span>Town: Moscow</span>
//           <button onClick={() => userStore.addToFriends()} className={s.addFriend}>Add friends</button>
//           <button onClick={() => writeMessage('2')} className={s.addFriend}>Write message</button>
//         </div>
//       </div>