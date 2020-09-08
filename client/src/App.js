import 'materialize-css'
import React, { useState, useEffect } from 'react'
import { useHttp, useMessage } from 'hooks'
import { Navbar, Toast, Loader } from 'components'
import { STORAGE_NAME } from 'utils/constants'
import { useSelector, useDispatch } from 'react-redux'
import Actions from 'redux/actions/user'
import Routes from './routes'

const dataLS = JSON.parse(localStorage.getItem(STORAGE_NAME))
const token = dataLS ? dataLS.token : null

const App = () => {
  const { request } = useHttp()
  const message = useMessage()
  const [isLoader, setIsLoader] = useState(true)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const userFromAPI = await request(`/api/user/`, 'GET', null, { auth: `Che ${token}` })
        dispatch(Actions.setUser({
          id: userFromAPI.id,
          name: userFromAPI.name,
          avatarUrl: userFromAPI.avatarUrl,
          isAuth: true,
          token: token
        }))
        setIsLoader(false)
      } catch (e) {
        message(e.message)
      }
    }

    Boolean(token) ? getUser() : setIsLoader(false)
  }, []) // eslint-disable-line

  return (
    <div className="App">
      {isLoader ? <Loader /> : <>
        <Toast />
        {user.isAuth && <Navbar />}
        <div className="container">
          {Routes(user.isAuth)}
        </div>
      </>}
    </div>
  )
}

export default App
