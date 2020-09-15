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
    socket.on('USER:UPDATE_STATUS', data => {
      setNewStatusState(data)
      setRefreshStatus(prevState => prevState + 1)
    })

    socket.on('MESSAGE:NEW', data => {
      setNewMessageState(data)
      setRefreshNewMessage(prevState => prevState + 1)
    })

    socket.on('MESSAGE:UPDATE_IS_READ', data => {
      setNewMessageIsReadState(data)
      setRefreshMessageIsRead(prevState => prevState + 1)
    })
  }, []) // eslint-disable-line

  // Socket Refresh Status 
  const [refreshStatus, setRefreshStatus] = useState(0)
  const [newStatusState, setNewStatusState] = useState()

  useEffect(() => {
    if (refreshStatus) {
      if (newStatusState.userId.toString() === userTo._id.toString()) {
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
  const [refreshNewMessage, setRefreshNewMessage] = useState(0)
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

    if (refreshNewMessage) addMessage()
  }, [refreshNewMessage]) // eslint-disable-line

  // Socket Update Status isRead 
  const [refreshMessageIsRead, setRefreshMessageIsRead] = useState(0)
  const [newMessageIsReadState, setNewMessageIsReadState] = useState()

  useEffect(() => {
    const updateIsReadState = () => {
      const { dialogId, messagesIds, messageUserId } = newMessageIsReadState
      if (dialogId.toString() === dialog._id.toString()) {
        if (messageUserId.toString() === userMy.id.toString()) {
          setTimeout(() => {
            setMessages(prevMessages => prevMessages.map(item => {
              if (messagesIds.some(messageId => messageId === item._id.toString())) return { ...item, isRead: true }
              return item
            }))
          }, 1000)
        }
      }
    }

    if (refreshMessageIsRead && Boolean(newMessageIsReadState.messagesIds.length)) updateIsReadState()
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