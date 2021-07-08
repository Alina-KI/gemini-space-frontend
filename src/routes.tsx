import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Friends } from './components/body/pages/friends/friends'
import { MyPage } from './components/body/pages/my-page/my-page'

export const Routes = () => {
  return (
    <Switch>
      <Route path="/user" component={MyPage} />
      <Route path="/friends" component={Friends} />
    </Switch>
  )
}