import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Top, Textarea, Messages } from 'components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'
import socket from 'core/socket'

const Dialog = ({ setDialogId }) => {
  const { request } = useHttp()
  const message = useMessage()

  const userMy = useSelector(state => state.user)
  const headers = { auth: `Che ${userMy.token}` }
  let { userToId } = useParams()
  const [userTo, setUserTo] = useState({})

  const [isLoader, setIsLoader] = useState(true)
  const [dialog, setDialog] = useState({})
  const [messages, setMessages] = useState([])

  // For socket 
  const [refreshNewMessage, setRefreshNewMessage] = useState(0)
  const [newMessageState, setNewMessageState] = useState()

  const [refreshMessageIsRead, setRefreshMessageIsRead] = useState(0)
  const [newMessageIsReadState, setNewMessageIsReadState] = useState()

  useEffect(() => {
    const getInfo = async () => {
      try {
        let messagesResponse = []
        setIsLoader(true)

        const userToResponse = await request(`/api/user/`, 'GET', { userToId }, headers)

        const dialogResponse = await request(`/api/dialog/`, 'GET', { userToId }, headers)

        if (dialogResponse.lastMessage) messagesResponse = await request(`/api/messages/`, 'GET', { dialogId: dialogResponse._id, userToId: userToId }, headers)

        setDialogId(dialogResponse._id)
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
    socket.on('MESSAGE:NEW', data => {
      setNewMessageState(data)
      setRefreshNewMessage(prevState => prevState + 1)
    })

    socket.on('MESSAGE:UPDATE_IS_READ', data => {
      setNewMessageIsReadState(data)
      setRefreshMessageIsRead(prevState => prevState + 1)
    })
  }, []) // eslint-disable-line

  useEffect(() => {
    const addMessage = async () => {
      const { dialogId, message } = newMessageState
      
      if (dialogId.toString() === dialog._id.toString()) {
        if (message.user.toString() !== userMy.id.toString()) {
          try {
            await request(`/api/message/update`, 'PUT', 
            { dialogId: dialog._id, messageId: message._id, messageUserId: message.user }, headers)
          } catch (e) { console.log(e.message) }
        }
        setMessages(prevMessages => [ ...prevMessages, message ])
        scrollMessages()
      }
    }

    if (refreshNewMessage) addMessage()
  }, [refreshNewMessage]) // eslint-disable-line

  useEffect(() => {
    const updateIsReadState = () => {
      const { dialogId, messageId, messageUserId } = newMessageIsReadState
      
      if (dialogId.toString() === dialog._id.toString()) {
        if (messageUserId.toString() === userMy.id.toString()) {
          setTimeout(() => {
            setMessages(prevMessages => prevMessages.map(item => {
              if (item._id.toString() === messageId.toString()) return { ...item, isRead: true }
              return item
            }))
          }, 1000)
        }
      }
    }

    if (refreshMessageIsRead) updateIsReadState()
  }, [refreshMessageIsRead]) // eslint-disable-line

  useEffect(() => {
    scrollMessages()
  }, [messages])

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