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
import { Community } from './components/pages/community/community'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/news" component={News} exact />
      <Route path="/auth" component={AuthPage} exact />
      <Route path="/registration" component={Registration} exact />
      <Route path="/:login" component={MyPage} exact />
      <Route path="/:login/friends" component={Friends} exact />
      <Route path="/:login/message/:dialogId" component={Message} exact />
      <Route path="/:login/gallery" component={Gallery} exact />
      <Route path="/:login/setting" component={Setting} exact />
      <Route path="/:login/community" component={Community} exact />
      <Route path="/" component={() => <Redirect to="/auth" />} />
    </Switch>
  )
}