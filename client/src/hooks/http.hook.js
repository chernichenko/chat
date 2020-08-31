import { useState } from 'react'
import axios from 'axios'

const useHttp = () => {
   const [loading, setLoading] = useState(false)

   const request = async (url, method = 'GET', data = null, headers = {}) => {
      let response
      setLoading(true)
      
      try {
         response = await axios({
            baseURL: 'http://localhost:5000',
            url,
            method: method.toLowerCase(),
            data,
            headers
         })
         
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