import './Sidebar.scss'
import React, { useState, useEffect } from 'react'
import { DialogItem } from 'components'
import { useHttp, useMessage } from 'hooks'
import { useSelector } from 'react-redux'

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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await request(`/api/users/`, 'GET', null, { auth: `Che ${user.token}` })
        setDialogs(users)
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
        {dialogs && dialogs.map(item => {
          console.log(item)
          return (
            <DialogItem
              key={item._id}
              avatar={item.avatarUrl}
              isOnline={item.isOnline}
              name={item.name} 
              lastMessage={'Test'}
              time={'Вчера'}
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