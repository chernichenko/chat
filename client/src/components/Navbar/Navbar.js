import './Navbar.scss'
import React from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import Actions from 'redux/actions/user'

const Navbar = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const userId = useSelector(state => state.user.id)

   const logoutHandler = (e) => {
      e.preventDefault()
      dispatch(Actions.logout({ id: userId }))
      history.push('/')
   }

   return(
      <nav className="Navbar">
         <div className="container">
            <div className="Navbar__inner">
               <span className="logo">Chat</span>
               <div>
                  <NavLink to="/">Диалоги</NavLink>
                  <NavLink to="/profile">Профиль</NavLink>
                  <NavLink to="/" onClick={logoutHandler}>Выйти</NavLink>
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Navbar
 