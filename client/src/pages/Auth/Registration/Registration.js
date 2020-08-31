import React, { useState } from 'react'
import { useHttp, useMessage } from 'hooks'
import { withRouter } from 'react-router-dom'
import RegistrationTemplate from './RegistrationTemplate'

const Registration = ({ history }) => {
   const { request, loading } = useHttp()
   const message = useMessage()
   const [form, setForm] = useState({ name: '', email: '', password: '' })

   const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   const registerHandler = async () => {
     try {
         const data = await request('/api/auth/register', 'POST', {...form})
         history.push(`/`)
         message(data.message)
      } catch (e) {
         message(e.message)
      }
   }

   return(
      <RegistrationTemplate 
         loading={loading}
         form={form}
         changeHandler={changeHandler}
         registerHandler={registerHandler}
      />
   )
}

export default withRouter(Registration)