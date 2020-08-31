import { LOGIN, LOGOUT } from 'redux/actionTypes'

const Actions = {
   login: token => {
      return {
         type: LOGIN,
         payload: {
            token
         }
      }
   },
   logout: () => {
      return {
         type: LOGOUT
      }
   }
}

export default Actions