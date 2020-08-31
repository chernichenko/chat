import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login, Registration, ChangePasswordStart, ChangePasswordFinish, Home } from 'pages'

const useRoutes = isAuth => {
   return (
      isAuth
      ? <Switch>
         <Route path="/" exact>
            <Home />
         </Route>
         <Redirect to="/" />
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
 
export default useRoutes