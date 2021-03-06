import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login, Registration, ChangePasswordStart, ChangePasswordFinish, Home, Profile } from 'pages'

const Routes = isAuth => {
   return (
      isAuth
      ? <Switch>
         <Route path="/profile">
            <Profile />
         </Route>
         <Route path="/">
            <Home />
         </Route>
      </Switch>
      :
      <Switch>
         <Route path="/" exact>
            <Login />
         </Route>
         <Route path="/registration" exact>
            <Registration />
         </Route>
         <Route path="/password" exact>
            <ChangePasswordStart />
         </Route>
         <Route path="/password/:token">
            <ChangePasswordFinish />
         </Route>

         <Redirect to="/" />
      </Switch>
   )
}
 
export default Routes