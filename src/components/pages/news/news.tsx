import React, { useEffect, useState } from 'react'
import s from './news.module.scss'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { groupStore } from '../../../store/group-store'
import { CommunityPost } from '../community-page/community-post'
import { groupPageStore } from '../../../store/group-page-store'

export const News = observer(() => {
  const [isNewsGroup, setIsNewsGroup] = useState(true)
  useEffect(() => {
    newsStore.fetchNews()
  }, [])

  useEffect(() => {
    groupStore.fetchMyGroups().then()
  }, [])

  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'} />


  return (
    <div className={s.container}>
      <div className={s.choose}>
        <button
          onClick={() => setIsNewsGroup(true)}
          className={`${s.button} ${isNewsGroup ? `${s.active}` : ''}`}>
          News
        </button>
        <button
          onClick={() => setIsNewsGroup(false)}
          className={`${s.button} ${!isNewsGroup ? `${s.active}` : ''}`}>
          World News
        </button>
      </div>
      <div className={s.containerNews}>
        {isNewsGroup ?
          groupPageStore.postsGroups.map(post => <CommunityPost {...post} key={post._id} />)
          :
          newsStore.news?.map(newsItem =>
            <div className={s.news} key={newsItem.url}>
              <h3 className={s.author}>Author: {newsItem.author}</h3>
              <h1 className={s.title}>{newsItem.title}</h1>
              <div className={s.description}>{newsItem.description}</div>
              <a href={newsItem.url} className={s.link}>More details</a>
              <img className={s.img} src={newsItem.urlToImage} alt="img" />
              <div className={s.content}>{newsItem.content}</div>
            </div>
          )}
      </div>
    </div>
  )
})