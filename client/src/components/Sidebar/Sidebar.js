import './Sidebar.scss'
import React, { useEffect } from 'react'
import { DialogItem } from 'components'
import { useHttp, useMessage } from 'hooks'
import { useSelector } from 'react-redux'

let dialogs = [
  {
    avatar: 'https://source.unsplash.com/random/1',
    isOnline: true,
    name: 'Jack The Ripper',
    lastMessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
    time: 'Сейчас',
    isMe: true,
    isRead: true,
    newMessagesCount: null,
  },
  {
    avatar: 'https://source.unsplash.com/random/2',
    isOnline: false,
    name: '222',
    lastMessage: 'Напиши как сможешь',
    time: '13:01',
    isMe: true,
    isRead: false,
    newMessagesCount: null,
  },
  {
    avatar: null,
    isOnline: false,
    name: 'Jack',
    lastMessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
    time: 'Сейчас',
    isMe: false,
    isRead: true,
    newMessagesCount: null,
  },
  {
    avatar: 'https://source.unsplash.com/random/4',
    isOnline: true,
    name: '444',
    lastMessage: 'Напиши как сможешь',
    time: 'Сейчас',
    isMe: false,
    isRead: false,
    newMessagesCount: 2,
  }
]

const Sidebar = () => {
  const { request } = useHttp()
  const message = useMessage()
  const user = useSelector(state => state.user)

  console.log(user)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await request(`/api/users/`, 'GET', null, { auth: `Che ${user.token}` })
        console.log(users)
      } catch (e) {
        message(e.message)
      }
    }

    getUsers()
  }, []) // eslint-disable-line

  return (
    <div className="Sidebar">
      <div className="Sidebar__top">
        <div className="Input">
          <input
            placeholder="Поиск среди контактов"
            type="text"
            name="search"
          />
        </div>
      </div>
      <div className="Sidebar__dialogs">
        {dialogs.map((item, key) => {
          return (
            <DialogItem
              key={key}
              avatar={item.avatar}
              isOnline={item.isOnline}
              name={item.name}
              lastMessage={item.lastMessage}
              time={item.time}
              isMe={item.isMe}
              isRead={item.isRead}
              newMessagesCount={item.newMessagesCount}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar