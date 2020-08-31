import './Navbar.scss'
import React from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import { useDispatch  } from 'react-redux'
import Actions from 'redux/actions/user'

const Navbar = () => {
   const history = useHistory()
   const dispatch = useDispatch()

   const logoutHandler = (e) => {
      e.preventDefault()
      dispatch(Actions.logout())
      history.push('/')
   }

   return(
      <nav className="Navbar">
         <div className="container">
            <div className="Navbar__inner">
               <span className="logo">Chat</span>
               <NavLink to="/" onClick={logoutHandler}>Выйти</NavLink>
            </div>
         </div>
      </nav>
   )
}

export default Navbar
 