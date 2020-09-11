import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Top, Textarea, Messages } from 'components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'
// import socket from 'core/socket'

const Dialog = () => {
  const { request } = useHttp()
  const message = useMessage()

  const userMy = useSelector(state => state.user)
  const headers = { auth: `Che ${userMy.token}` }
  let { userToId } = useParams()
  const [userTo, setUserTo] = useState({})

  const [isLoader, setIsLoader] = useState(true)
  const [dialog, setDialog] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      try {
        let messagesResponse = []
        setIsLoader(true)

        const userToResponse = await request(`/api/user/`, 'GET', { userToId }, headers)

        const dialogResponse = await request(`/api/dialog/`, 'GET', { userToId }, headers)

        if (dialogResponse.lastMessage) messagesResponse = await request(`/api/messages/`, 'GET', { dialogId: dialogResponse._id }, headers)

        setUserTo(userToResponse)
        setDialog(dialogResponse)
        setMessages(messagesResponse)
        setIsLoader(false)
        scrollMessages()
      } catch (e) {
        message(e.message)
      }
    }

    getInfo()
  }, [userToId]) // eslint-disable-line

  useEffect(() => {
    // socket.on('MESSAGE:NEW', data => {
    //   // Check if this my dialog.
    //   // Add message to state

    //   // setMessages(prevMessages => {
    //   //   return {
    //   //     ...prevMessages,
    //   //     newMessage
    //   //   }
    //   // })
    //   // scrollMessages()
    // })
  }, []) // eslint-disable-line

  const scrollMessages = () => {
    const messagesWrap = document.getElementById('messages')
    messagesWrap.scrollTop = messagesWrap.scrollHeight
  }

  return (
    <div className="Dialog">
      <Top 
        userTo={userTo} 
      />
      <Messages
        isLoader={isLoader}
        messages={messages}
        userMy={userMy}
        userTo={userTo}
      />
      <Textarea
        dialogId={dialog._id}
        user={userMy}
      />
    </div>
  )
}

export default Dialog