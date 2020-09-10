import { LOGIN, LOGOUT, SET_USER } from 'redux/actionTypes'

const Actions = {
   login: data => {
      return {
         type: LOGIN,
         payload: data
      }
   },
   logout: data => {
      return {
         type: LOGOUT,
         payload: data
      }
   },
   setUser: data => {
      return{
         type: SET_USER,
         payload: data
      }
   }
}

export default Actions