import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'
import ChangePasswordStartTemplate from './ChangePasswordStartTemplate'

const ChangePasswordStart = () => {
   const { request, loading } = useHttp()
   const message = useMessage()
   const history = useHistory()
   const [email, setEmail] = useState('')

   const resetHandler = async () => {
      setEmail('')
      try {
         const data = await request('/api/auth/reset', 'POST', {email})
         history.push(`/`)
         message(data.message)
      } catch (e) {
         message(e.message)
      }
   }

   return(
      <ChangePasswordStartTemplate 
         loading={loading}
         email={email}
         setEmail={setEmail}
         resetHandler={resetHandler}
      />
   )
}

export default ChangePasswordStart
