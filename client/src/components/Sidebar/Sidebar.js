import './Sidebar.scss'
import React, { useState, useEffect } from 'react'
import { useHttp, useMessage } from 'hooks'
import { useSelector } from 'react-redux'
import { DialogItem, Search } from 'components'
import { getFormatedTime } from 'utils/date'
import socket from 'core/socket'

// let dialogs = [
//   {
//     avatar: 'https://source.unsplash.com/random/1',
//     isOnline: true,
//     name: 'Jack The Ripper',
//     lastMessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
//     time: 'Сейчас',
//     isMe: true,
//     isRead: true,
//     newMessagesCount: null,
//   },
//   {
//     avatar: 'https://source.unsplash.com/random/2',
//     isOnline: false,
//     name: '222',
//     lastMessage: 'Напиши как сможешь',
//     time: '13:01',
//     isMe: true,
//     isRead: false,
//     newMessagesCount: null,
//   },
//   {
//     avatar: null,
//     isOnline: false,
//     name: 'Jack',
//     lastMessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
//     time: 'Сейчас',
//     isMe: false,
//     isRead: true,
//     newMessagesCount: null,
//   },
//   {
//     avatar: 'https://source.unsplash.com/random/4',
//     isOnline: true,
//     name: '444',
//     lastMessage: 'Напиши как сможешь',
//     time: 'Сейчас',
//     isMe: false,
//     isRead: false,
//     newMessagesCount: 2,
//   }
// ]

const Sidebar = () => {
  const { request } = useHttp()
  const message = useMessage()
  const user = useSelector(state => state.user)

  const [dialogs, setDialogs] = useState()
  const [initialDialogs, setInitialDialogs] = useState()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await request(`/api/users/`, 'GET', null, { auth: `Che ${user.token}` })
        setDialogs(users)
        setInitialDialogs(users)
      } catch (e) {
        message(e.message)
      }
    }

    getUsers()
  }, []) // eslint-disable-line

  useEffect(() => {
    socket.on('USER:UPDATE_STATUS', data => {
      // Find dialog with data.userId
      // update isOnline: data.isOnline
    })
    socket.on('MESSAGE:NEW', data => {
      // refresh dialogs 
    })
  }, []) // eslint-disable-line

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
              key={item.name + key}
              id={item._id}
              avatar={item.avatarUrl}
              isOnline={item.isOnline}
              name={item.name} 
              lastMessage={'Test'}
              time={getFormatedTime(new Date())}
              isMe={true}
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