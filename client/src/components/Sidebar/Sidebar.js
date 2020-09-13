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

  // For socket 
  const [refreshStatus, setRefreshStatus] = useState(0)
  const [newStatusState, setNewStatusState] = useState()

  const [refreshLastMessage, setRefreshLastMessage] = useState(0)
  const [newLastMessageState, setNewLastMessageState] = useState()

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
    }) // eslint-disable-line

    socket.on('MESSAGE:NEW', data => {
      setNewLastMessageState(data)
      setRefreshLastMessage(prevState => prevState + 1)
    })
  }, []) // eslint-disable-line

  useEffect(() => {
    if (refreshStatus) {
      const newDialogs = dialogs.map(dialog => {
        if (dialog._id.toString() === newStatusState.id.toString()) {
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

  useEffect(() => {
    // useParams заношу в редакс. беру його звідти. Якщо відкритий діалог той, що прийшов з сокета, то смс ставлю як прочитану
    // якщо ні, то додаю каунт +1 для цієї смс
    if (refreshLastMessage) {
      const newDialogs = dialogs.map(dialog => {
        if (dialog._id.toString() === newLastMessageState.dialogId.toString()) {
          return {
            ...dialog,
            lastMessage: newLastMessageState.message
          }
        }
        return dialog
      })
      setDialogs(newDialogs)
    }
  }, [refreshLastMessage]) // eslint-disable-line

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
              key={item.userTo._id + key}
              id={item.userTo._id}
              avatar={item.userTo.avatarUrl}
              isOnline={item.userTo.isOnline}
              name={item.userTo.name}
              lastMessage={item.lastMessage ? item.lastMessage.text : ''}
              time={item.lastMessage ? getFormatedTime(new Date(item.lastMessage.createdAt)) : ''}
              isMe={item.lastMessage ? user.id.toString() === item.lastMessage.user.toString() : ''}
              isRead={item.lastMessage ? item.lastMessage.isRead : false}
              newMessagesCount={0}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar