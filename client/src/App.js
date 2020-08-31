import React from 'react'
import 'materialize-css'
// import { useRoutes } from 'hooks'
import { Navbar } from 'components'
// import { useSelector  } from 'react-redux'
import { Home } from 'pages'

const App = () => {
  // const isAuth = useSelector(state => state.user.isAuth)

  return (
    // <div className="App">
    //   {isAuth && <Navbar />}
    //   <div className="container">
    //     {useRoutes(isAuth)}
    //   </div>
    // </div>
    <div className="App">
      <Navbar />
      <div className="container">
        <Home />
      </div>
    </div>
  )
}

export default App
