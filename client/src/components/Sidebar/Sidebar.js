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

  const [dialogs, setDialogs] = useState()
  const [initialDialogs, setInitialDialogs] = useState()

  // For socket 
  const [refresh, setRefresh] = useState(0)
  const [changedUserState, setChangedUserState] = useState()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const dialogItemsResponse = await request(`/api/dialogs/sidebar`, 'GET', null, headers)
        console.log(dialogItemsResponse)

        setDialogs(dialogItemsResponse)
        setInitialDialogs(dialogItemsResponse)
      } catch (e) {
        message(e.message)
      }
    }

    getUsers()
  }, []) // eslint-disable-line

  useEffect(() => {
    socket.on('USER:UPDATE_STATUS', data => {
      setChangedUserState(data)
      setRefresh(prevState => prevState + 1)
    }) // eslint-disable-line
    
    // socket.on('MESSAGE:NEW', data => {
    //   // refresh dialogs 
    // })
  }, []) // eslint-disable-line

  useEffect(() => {
    if (refresh) {
      const newDialogs = dialogs.map(dialog => {
        if (dialog._id.toString() === changedUserState.id.toString()) {
          return { 
            ...dialog, 
            userTo: { 
              ...dialog.userTo, 
              isOnline: changedUserState.isOnline 
            } 
          }
        }
        return dialog
      })
      setDialogs(newDialogs)
    }
  }, [refresh]) // eslint-disable-line

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
              lastMessage={item.lastMessage.text}
              time={getFormatedTime(item.lastMessage.createdAt)}
              isMe={user._id.toString() === item.lastMessage.user._id.toString()}
              isRead={false}
              newMessagesCount={0}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar