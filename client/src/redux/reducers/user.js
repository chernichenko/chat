import { LOGIN, LOGOUT } from 'redux/actionTypes'
import { STORAGE_NAME } from 'utils/constants'

const dataLS = JSON.parse(localStorage.getItem(STORAGE_NAME))
const tokenFromLS = dataLS ? dataLS.token : null

const initialState = {
   isAuth: !!tokenFromLS,
   token: tokenFromLS
}

const userReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case LOGIN:
         localStorage.setItem(STORAGE_NAME, JSON.stringify({
            token: payload.token
         }))
         return {
            isAuth: true,
            token: payload.token
         };
      case LOGOUT:
         localStorage.removeItem(STORAGE_NAME)
         return {
            isAuth: false,
            token: null
         };
      default:
         return state;
   }
}

export default userReducer
