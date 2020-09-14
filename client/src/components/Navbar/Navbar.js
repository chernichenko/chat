import './Navbar.scss'
import React from 'react'
import { useHistory, NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useHttp, useMessage } from 'hooks'
import Actions from 'redux/actions/user'

const Navbar = () => {
   const history = useHistory()
   const message = useMessage()
   const dispatch = useDispatch()
   const user = useSelector(state => state.user)
   const { request } = useHttp()
   const headers = { auth: `Che ${user.token}` }

   const logoutHandler = async e => {
      try {
         e.preventDefault()
         await request(`/api/auth/logout`, 'POST', null, headers)
         dispatch(Actions.logout({ userId: user.id })) 
         history.push('/')
      } catch (e) { message(e.message) }
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
 