import React, { useEffect } from 'react'
import s from './news.module.scss'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { observer } from 'mobx-react-lite'

export const News = observer(() => {
  useEffect(()=>{
    newsStore.fetchNews()
  },[])
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>
  return (
    <div className={s.container}>
      {newsStore.news?.map(newsItem =>
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
  )
})