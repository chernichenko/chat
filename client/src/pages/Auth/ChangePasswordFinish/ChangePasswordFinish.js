import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'
import ChangePasswordFinishTemplate from './ChangePasswordFinishTemplate'

const ChangePasswordFinish = () => {
   const { request, loading } = useHttp()
   const message = useMessage()
   const history = useHistory()
   const token = useParams().token
   const [password, setPassword] = useState('')

   const resetHandler = async () => {
      setPassword('')
      try {
         const data = await request('/api/auth/reset/finished', 'POST', {password, token})
         message(data.message) 
         history.push(`/`)
      } catch (e) {
         message(e.message)
         history.push(`/`)
      }
   }

   return(
      <ChangePasswordFinishTemplate 
         loading={loading}
         password={password}
         setPassword={setPassword}
         resetHandler={resetHandler}
      />
   )
}

export default ChangePasswordFinish