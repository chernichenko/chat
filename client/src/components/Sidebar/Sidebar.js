import './Sidebar.scss'
import React, { useState, useEffect } from 'react'
import { useHttp, useMessage } from 'hooks'
import { useSelector } from 'react-redux'
import { DialogItem, Search } from 'components'
import { getFormatedTime } from 'utils/date'
import socket from 'core/socket'

const Sidebar = () => {
  const { request } = useHttp()
  const message = useMessage()
  const user = useSelector(state => state.user)
  const headers = { auth: `Che ${user.token}` }

  const [dialogs, setDialogs] = useState([])
  const [initialDialogs, setInitialDialogs] = useState()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const dialogItemsResponse = await request(`/api/dialogs/sidebar`, 'GET', null, headers)

        setDialogs(dialogItemsResponse)
        setInitialDialogs(dialogItemsResponse)
        setIsFirstLoad(false)
      } catch (e) {
        message(e.message)
      }
    }
    getUsers()

    socket.on('USER:UPDATE_STATUS', data => setNewStatusState(data))
    socket.on('MESSAGE:NEW', data => setNewLastMessageState(data))
    socket.on('MESSAGE:UPDATE_IS_READ', data => setNewMessageIsReadState(data))
  }, []) // eslint-disable-line

  // Socket Refresh Status 
  const [newStatusState, setNewStatusState] = useState()

  useEffect(() => {
    if (!isFirstLoad) {
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
  }, [newStatusState]) // eslint-disable-line

  // Socket Last Message
  const [newLastMessageState, setNewLastMessageState] = useState()

  useEffect(() => {
    if (!isFirstLoad) {
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
  }, [newLastMessageState]) // eslint-disable-line

  // Socket Status isRead 
  const [newMessageIsReadState, setNewMessageIsReadState] = useState()

  useEffect(() => {
    const updateIsReadState = () => {
      const newDialogs = dialogs.map(dialog => {
        if (dialog._id.toString() === newMessageIsReadState.dialogId.toString()) {
          if (newMessageIsReadState.messagesIds.some(messageId => messageId === dialog.lastMessage._id.toString())) {
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

    if (!isFirstLoad && Boolean(newMessageIsReadState.messagesIds.length)) updateIsReadState()
  }, [newMessageIsReadState]) // eslint-disable-line

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