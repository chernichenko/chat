import React, { useState } from 'react'
import { useHttp, useMessage } from 'hooks'
import { withRouter } from 'react-router-dom'
import RegistrationTemplate from './RegistrationTemplate'

const Registration = ({ history }) => {
   const { request, loading } = useHttp()
   const message = useMessage()
   const [form, setForm] = useState({ name: '', email: '', password: '', file: '' })

   const changeHandler = event => {
      let newValue
      event.target.type !== 'file' ? newValue = event.target.value : newValue = event.target.files[0]
      setForm({ ...form, [event.target.name]: newValue })
   }

   const registerHandler = async () => {
      let formData = new FormData()
      for (let key in form) {
         formData.append(key, form[key])
      }

      try {
         const data = await request('/api/auth/register', 'POST', formData)
         history.push(`/`)
         message(data.message)
      } catch (e) {
         message(e.message)
      }
   }

   return (
      <RegistrationTemplate
         loading={loading}
         form={form}
         changeHandler={changeHandler}
         registerHandler={registerHandler}
      />
   )
}

export default withRouter(Registration)