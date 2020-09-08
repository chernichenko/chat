import { LOGIN, LOGOUT, SET_USER } from 'redux/actionTypes'
import { STORAGE_NAME } from 'utils/constants'

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
         return {
            id: payload._id,
            name: payload.name,
            avatarUrl: payload.avatarUrl,
            isAuth: true,
            token: payload.token
         }
      case LOGOUT:
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
