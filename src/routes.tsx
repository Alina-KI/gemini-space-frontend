import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Friends } from './components/pages/friends/friends'
import { MyPage } from './components/pages/my-page/my-page'
import { Message } from './components/pages/message/message'
import { AuthPage } from './components/auth/auth'
import { Registration } from './components/registration/registration'
import { Gallery } from './components/pages/gallery/gallery'
import { News } from './components/pages/news/news'
import { Setting } from './components/pages/setting/setting'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/user/:login" component={MyPage} exact />
      <Route path="/friends" component={Friends} exact />
      <Route path="/message" component={Message} exact />
      <Route path="/auth" component={AuthPage} exact />
      <Route path="/registration" component={Registration} exact />
      <Route path="/gallery" component={Gallery} exact />
      <Route path="/news" component={News} exact />
      <Route path="/setting" component={Setting} exact />
      <Route path="/" component={() => <Redirect to="/auth" />} />
    </Switch>
  )
}