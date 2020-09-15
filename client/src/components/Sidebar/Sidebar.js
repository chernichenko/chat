import './Sidebar.scss'
import React, { useState, useEffect } from 'react'
import { useHttp, useMessage } from 'hooks'
import { useSelector } from 'react-redux'
import { DialogItem, Search } from 'components'
import { getFormatedTime } from 'utils/date'
import socket from 'core/socket'

const Sidebar = ({ dialogId }) => {
  const { request } = useHttp()
  const message = useMessage()
  const user = useSelector(state => state.user)
  const headers = { auth: `Che ${user.token}` }

  const [dialogs, setDialogs] = useState([])
  const [initialDialogs, setInitialDialogs] = useState()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const dialogItemsResponse = await request(`/api/dialogs/sidebar`, 'GET', null, headers)

        setDialogs(dialogItemsResponse)
        setInitialDialogs(dialogItemsResponse)
      } catch (e) {
        message(e.message)
      }
    }
    getUsers()

    socket.on('USER:UPDATE_STATUS', data => {
      setNewStatusState(data)
      setRefreshStatus(prevState => prevState + 1)
    })

    socket.on('MESSAGE:NEW', data => {
      setNewLastMessageState(data)
      setRefreshLastMessage(prevState => prevState + 1)
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
      const newDialogs = dialogs.map(dialog => {
        if (dialog.userTo._id.toString() === newStatusState.userId.toString()) {
          return {
            ...dialog,
            userTo: {
              ...dialog.userTo,
              isOnline: newStatusState.isOnline
            }
          }
        }
        return dialog
      })
      setDialogs(newDialogs)
    }
  }, [refreshStatus]) // eslint-disable-line

  // Socket Last Message
  const [refreshLastMessage, setRefreshLastMessage] = useState(0)
  const [newLastMessageState, setNewLastMessageState] = useState()

  useEffect(() => {
    if (refreshLastMessage) {
      const newDialogs = dialogs.map(dialog => {
        if (dialog._id.toString() === newLastMessageState.dialogId.toString()) {
          let newMessagesCount 
          user.id.toString() === newLastMessageState.message.user.toString() 
            ? newMessagesCount = 0
            : newMessagesCount = newLastMessageState.newMessagesCount 
          return { ...dialog, lastMessage: newLastMessageState.message, newMessagesCount }
        }
        return dialog
      })
      setDialogs(newDialogs)
    }
  }, [refreshLastMessage]) // eslint-disable-line

  // Socket Status isRead 
  const [refreshMessageIsRead, setRefreshMessageIsRead] = useState(0)
  const [newMessageIsReadState, setNewMessageIsReadState] = useState()

  useEffect(() => {
    const updateIsReadState = () => {
      const { dialogId, messagesIds } = newMessageIsReadState

      const newDialogs = dialogs.map(dialog => {
        if (dialog._id.toString() === dialogId.toString()) {
          if (messagesIds.some(messageId => messageId === dialog.lastMessage._id.toString())) {
            return {
              ...dialog,
              newMessagesCount: 0,
              lastMessage: {
                ...dialog.lastMessage,
                isRead: true
              }
            }
          }
        }
        return dialog
      })
      setTimeout(() => { setDialogs(newDialogs) }, 1000)
    }

    if (refreshMessageIsRead && Boolean(newMessageIsReadState.messagesIds.length)) updateIsReadState()
  }, [refreshMessageIsRead]) // eslint-disable-line

  return (
    <div className="Sidebar">
      <div className="Sidebar__top">
        <Search
          initialDialogs={initialDialogs}
          dialogs={dialogs}
          setDialogs={setDialogs}
        />
      </div>
      <div className="Sidebar__dialogs">
        {dialogs && dialogs.map((item, key) => {
          return (
            <DialogItem
              key={item._id + key}
              userToId={item.userTo._id}
              avatar={item.userTo.avatarUrl}
              isOnline={item.userTo.isOnline}
              name={item.userTo.name}
              lastMessage={item.lastMessage ? item.lastMessage.text : ''}
              time={item.lastMessage ? getFormatedTime(new Date(item.lastMessage.createdAt)) : ''}
              isMe={''}
              isRead={item.lastMessage ? item.lastMessage.isRead : false}
              newMessagesCount={item.newMessagesCount ? item.newMessagesCount : 0}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar