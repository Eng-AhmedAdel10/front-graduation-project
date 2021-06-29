import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './components/home/Home'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import Error from './components/error/Error'
import Update_profile from './components/update_profile/Update_profile'
import Change_password from './components/change_password/Change_password'
import Search from './components/search/Search'
import { useGlopalContext } from './context'

const App = () => {
  const { info: token, tweets } = useGlopalContext()
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/signup'>{!token ? <Signup /> : <Redirect to='/' />}</Route>
      <Route path='/login'>{!token ? <Login /> : <Redirect to='/' />}</Route>
      <Route path='/profile'>{token ? <Profile /> : <Redirect to='/' />}</Route>
      <Route path='/update_profile'>
        {token ? <Update_profile /> : <Redirect to='/' />}
      </Route>
      <Route path='/change_password'>
        {token ? <Change_password /> : <Redirect to='/' />}
      </Route>
      <Route path='/search'>{tweets ? <Search /> : <Redirect to='/' />}</Route>
      <Route path='*' component={Error} />
    </Switch>
  )
}

export default App
