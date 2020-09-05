import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import Actions from 'redux/actions/user'
import { useHttp, useMessage } from 'hooks'
import LoginTemplate from './LoginTemplate'

const Login = () => {
   const { request, loading } = useHttp()
   const message = useMessage()
   const dispatch = useDispatch()
   const [form, setForm] = useState({ email: '', password: '' })

   const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value }) 
   }
   
   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...form})
         dispatch(Actions.login(data))
      } catch (e) { message(e.message) }
   }

   return(
      <LoginTemplate 
         loading={loading}
         form={form}
         changeHandler={changeHandler}
         loginHandler={loginHandler}
      />
   )
}

export default Login