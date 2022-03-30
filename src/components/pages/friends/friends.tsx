import React from 'react'
import s from './friends.module.scss'
import avatar1 from '../../../images/11.jpg'
import avatar2 from '../../../images/1.jpg'
import avatar3 from '../../../images/15.jpg'
import avatar4 from '../../../images/7.jpg'
import avatar5 from '../../../images/13.jpg'
import avatar6 from '../../../images/5.jpg'
import avatar7 from '../../../images/3.jpg'
import avatar8 from '../../../images/8.jpg'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
// import { UserList } from './user-list/user-list'

export const Friends = observer(() => {
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.container}>
      {/*<UserList />*/}

      <div className={s.card}>
        <img className={s.img} src={avatar1} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
          <button className={s.addFriend}>Add friends</button>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar2} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar3} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar5} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar6} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar4} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar7} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar8} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar4} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={avatar4} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
    </div>
  )
})