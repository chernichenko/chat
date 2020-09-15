import React, { useState, useEffect } from 'react'
import { useHttp, useMessage } from 'hooks'
import { withRouter } from 'react-router-dom'
import ProfileTemplate from './ProfileTemplate'
import { useSelector, useDispatch } from 'react-redux'
import Actions from 'redux/actions/user'

const Profile = ({ history }) => {
  const { request, loading } = useHttp()
  const message = useMessage()
  const user = useSelector(state => state.user)
  const [form, setForm] = useState({ name: user.name, avatarUrl: user.avatarUrl, file: '' })
  const dispatch = useDispatch()

  useEffect(() => {
    setForm({ name: user.name, avatarUrl: user.avatarUrl, file: '' })
  }, [user])

  const changeHandler = event => {
    let newValue
    event.target.type !== 'file' ? newValue = event.target.value : newValue = event.target.files[0]
    setForm({ ...form, [event.target.name]: newValue })
  }

  const saveProfileHandler = async () => {
    let formData = new FormData()
    formData.append('name', form.name)
    formData.append('file', form.file)

    try {
      const data = await request('/api/profile', 'POST', formData, { auth: `Che ${user.token}` })
      dispatch(Actions.setUser({
        name: form.name,
        avatarUrl: data.avatarUrl
      }))
      history.push(`/`)
      message(data.message)
    } catch (e) {
      message(e.message)
    }
  }

  return (
    <ProfileTemplate
      loading={loading}
      form={form}
      changeHandler={changeHandler}
      saveProfileHandler={saveProfileHandler}
    />
  )
}

export default withRouter(Profile)