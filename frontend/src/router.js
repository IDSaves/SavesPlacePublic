import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './components/home/_index'
import Login from './components/auth/login'
import Register from './components/auth/register'
import SubmitEvent from './components/submit_event/_index'
import Events from './components/events/_index'
import Submissions from './components/submissions/_index'
import Event from './components/event/_index'
import Profile from './components/profile/_index'
import Settings from './components/settings/_index'
import PasswordSettings from './components/settings/password/_index'
import PasswordReset from './components/password_reset/_index'
import PasswordResetConfirm from './components/password_reset/confirmation/_index'
import About from './components/about/_index'
import { CookiesPolicy } from './components/cookies/_index'

const NoMatch = ({ location }) => (
  <div className="mt-4 mb-4 text-center">
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


export default function Router() {
  return(
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/submit" component={SubmitEvent} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/submissions" component={Submissions} />
      <Route exact path="/event/:id" component={Event} />
      <Route exact path="/profile/:username" component={Profile} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/settings/password" component={PasswordSettings} />
      <Route exact path="/password-reset" component={PasswordReset} />
      <Route exact path="/password_reset_confirm" component={PasswordResetConfirm} />
      <Route exact path="/about" component={About} />
      <Route path="/cookies_policy" component={CookiesPolicy}/>
      <Route component={NoMatch} />

    </Switch>
  )
}
