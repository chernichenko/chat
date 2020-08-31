import React from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch  } from 'react-redux'
import Actions from 'redux/actions/user'

export const Navbar = () => {
   const history = useHistory()
   const dispatch = useDispatch()

   const logoutHandler = (e) => {
      e.preventDefault()
      dispatch(Actions.logout())
      history.push('/')
   }

   return(
      <nav>
         <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
            <span className="brand-logo">Chat</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
         </div>
      </nav>
   )
}
 