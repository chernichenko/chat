import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Top, Textarea, Messages } from 'components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'

const Dialog = () => {
  const { request } = useHttp()
  const message = useMessage()

  const userMy = useSelector(state => state.user)
  const headers = { auth: `Che ${userMy.token}` }
  let { userToId } = useParams()
  const [userTo, setUserTo] = useState({})

  const [isLoader, setIsLoader] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [dialog, setDialog] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      try {
        let messagesResponse = []
        setIsLoader(true)

        const userToResponse = await request(`/api/user/`, 'GET', { userToId }, headers)

        const dialogResponse = await request(`/api/dialog/`, 'GET', { userToId }, headers)

        if (dialogResponse.lastMessage) messagesResponse = await getMessages(dialogResponse._id)

        setUserTo(userToResponse)
        setDialog(dialogResponse)
        setMessages(messagesResponse)
        setRefresh(prevState => prevState + 1)
        setIsLoader(false)
        scrollMessages()
      } catch (e) {
        message(e.message)
      }
    }

    getInfo()
  }, [userToId]) // eslint-disable-line

  useEffect(() => {
    const getMessagesRefresh = async () => {
      setMessages(await getMessages(dialog._id))
      scrollMessages()
    }
    if (refresh > 1) getMessagesRefresh()
  }, [refresh]) // eslint-disable-line

  const getMessages = async dialogId => {
    const messagesResponse = await request(`/api/messages/`, 'GET', { dialogId: dialogId }, headers)
    return messagesResponse
  }

  const scrollMessages = () => {
    const messagesWrap = document.getElementById('messages')
    messagesWrap.scrollTop = messagesWrap.scrollHeight
  }

  return (
    <div className="Dialog">
      <Top name={userTo.name} />
      <Messages
        isLoader={isLoader}
        messages={messages}
        userMy={userMy}
        userTo={userTo}
      />
      <Textarea
        dialogId={dialog._id}
        user={userMy}
        setRefresh={setRefresh}
      />
    </div>
  )
}

export default Dialog