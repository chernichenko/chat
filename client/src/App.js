import React from 'react'
import 'materialize-css'
import { useRoutes } from 'hooks'
import { Navbar } from 'components/Navbar'
import { useSelector  } from 'react-redux'

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <div className="App">
      {isAuth && <Navbar />}
      <div className="container">
        {useRoutes(isAuth)}
      </div>
    </div>
  )
}

export default App
