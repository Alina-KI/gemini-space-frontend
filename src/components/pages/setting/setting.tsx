import React from 'react'
import s from './setting.module.scss'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export const Setting = observer(() => {
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.setting}>
      {/*Setting*/}
      <ErrorDisplay message="1"/>
    </div>
  )
})