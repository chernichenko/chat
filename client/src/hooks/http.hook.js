import { useState } from 'react'
import axios from 'axios'

const useHttp = () => {
   const [loading, setLoading] = useState(false)

   const request = async (url, method = 'GET', data = null, headers = {}) => {
      let response
      setLoading(true)
      
      const request = {
         method: method.toLowerCase(),
         baseURL: 'http://localhost:5000',
         url,
         headers
      }
      if (method === 'GET') request['params'] = data
      if (method === 'POST') request['data'] = data
       
      try {
         response = await axios(request)
         
         response = await response.data
         setLoading(false)
         return response
      } catch (e) {
         setLoading(false)
         throw e
      }
   } 

   return { request, loading }
}

export default useHttp