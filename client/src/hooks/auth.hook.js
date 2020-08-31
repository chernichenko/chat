import {useState, useCallback, useEffect} from 'react'

const storageName = 'userTestData'

const useAuth = () => {
   const [token, setToken] = useState(null)
   const [ready, setReady] = useState(null)

   const login = useCallback((jwtToken) => {
      setToken(jwtToken)

      localStorage.setItem(storageName, JSON.stringify({
         token: jwtToken
      }))
   }, [])

   const logout = useCallback((jwtToken) => {
      setToken(null) 
      localStorage.removeItem(storageName)
   }, [])

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))

      if (data && data.token) {
         login(data.token)
      }
      setReady(true)
   }, [login])

   return { login, logout, token, ready }
}

export default useAuth