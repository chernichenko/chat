import { LOGIN, LOGOUT, SET_USER } from 'redux/actionTypes'
import { STORAGE_NAME } from 'utils/constants'
import socket from 'core/socket'

const initialState = {
   name: null,
   avatarUrl: null,
   isAuth: null,
   token: null
}

const userReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case LOGIN:
         localStorage.setItem(STORAGE_NAME, JSON.stringify({
            token: payload.token
         }))
         return { ...payload }
      case LOGOUT:
         socket.emit('USER:UPDATE_STATUS', { id: payload.id })
         localStorage.removeItem(STORAGE_NAME)
         return {
            isAuth: false,
            token: null
         }
      case SET_USER:
         return { ...payload }
      default:
         return state
   }
}

export default userReducer
