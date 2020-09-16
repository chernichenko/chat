import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Top, Textarea, Messages } from 'components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'
import socket from 'core/socket'

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
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const getInfo = async () => {
      try {
        let messagesResponse = []
        setIsLoader(true)

        const userToResponse = await request(`/api/user/`, 'GET', { userToId }, headers)

        const dialogResponse = await request(`/api/dialog/`, 'GET', { userToId }, headers)

        if (dialogResponse.lastMessage) messagesResponse = await request(`/api/messages/`, 'GET', { dialogId: dialogResponse._id, userToId: userToId }, headers)

        setUserTo(userToResponse)
        setDialog(dialogResponse)
        setMessages(messagesResponse)
        setIsLoader(false)
        scrollMessages()
        setIsFirstLoad(false)
      } catch (e) {
        message(e.message)
      }
    }

    getInfo()
  }, [userToId]) // eslint-disable-line

  useEffect(() => {
    socket.on('USER:UPDATE_STATUS', data => setNewStatusState(data))
    socket.on('MESSAGE:NEW', data => setNewMessageState(data))
    socket.on('MESSAGE:UPDATE_IS_READ', data => setNewMessageIsReadState(data))
  }, []) // eslint-disable-line

  // Socket Refresh Status 
  const [newStatusState, setNewStatusState] = useState()

  useEffect(() => {
    if (!isFirstLoad) {
      if (newStatusState.userId.toString() === userToId.toString()) {
        setUserTo(prevUser => {
          return {
            ...prevUser,
            isOnline: newStatusState.isOnline
          }
        })
      } 
    }
  }, [refreshStatus]) // eslint-disable-line

  // Socket New Message 
  const [newMessageState, setNewMessageState] = useState()

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

    if (!isFirstLoad) addMessage()
  }, [refreshNewMessage]) // eslint-disable-line

  // Socket Update Status isRead 
  const [newMessageIsReadState, setNewMessageIsReadState] = useState()

  useEffect(() => {
    const updateIsReadState = () => {
      const { dialogId, messagesIds, messageUserId } = newMessageIsReadState
      if (dialogId.toString() === dialog._id.toString()) {
        if (messageUserId.toString() === userMy.id.toString()) {
          setMessages(prevMessages => prevMessages.map(item => {
            if (messagesIds.some(messageId => messageId === item._id.toString())) return { ...item, isRead: true }
            return item
          }))
        }
      }
    }

    if (!isFirstLoad && Boolean(newMessageIsReadState.messagesIds.length)) updateIsReadState()
  }, [refreshMessageIsRead]) // eslint-disable-line

  // Scroll dialog window 
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