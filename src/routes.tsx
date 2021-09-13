import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Friends } from './components/pages/friends/friends'
import { MyPage } from './components/pages/my-page/my-page'
import { Message } from './components/pages/message/message'
import { AuthPage } from './components/pages/auth/auth'
import { Registration } from './components/pages/registration/registration'
import { Gallery } from './components/pages/gallery/gallery'
import { News } from './components/pages/news/news'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/user" component={MyPage} exact />
      <Route path="/friends" component={Friends} exact />
      <Route path="/message" component={Message} exact />
      <Route path="/auth" component={AuthPage} exact />
      <Route path="/registration" component={Registration} exact />
      <Route path="/gallery" component={Gallery} exact />
      <Route path="/news" component={News} exact />
      {/*<Route path="/" component={() => <Redirect to="/auth"/>} />*/}
      <Route path="/" component={() => <Redirect to="/user" />} />
    </Switch>
  )
}