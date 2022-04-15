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
import { FindFriends } from './components/pages/friends/find-friends'
import { Dialogs } from './components/pages/dialogs/dialogs'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/news" component={News} exact />
      <Route path="/auth" component={AuthPage} exact />
      <Route path="/" component={Registration} exact />
      <Route path="/find-friends" component={FindFriends} exact />
      <Route path="/:login/friends" component={Friends} exact />
      <Route path="/dialogs" component={Dialogs} exact />
      <Route path="/dialogs/:dialogId" component={Message} exact />
      <Route path="/:login/gallery" component={Gallery} exact />
      <Route path="/:login/setting" component={Setting} exact />
      <Route path="/:login/community" component={Community} exact />
      <Route path="/:login" component={MyPage} exact />
      <Route path="/" component={() => <Redirect to="/auth" />} />
    </Switch>
  )
}