import './Sidebar.scss'
import React from 'react'
import { DialogItem } from 'components'

const Sidebar = () => {
  let dialogs = [
    {
      avatar: 'https://source.unsplash.com/random/1',
      isOnline: true,
      name: 'Jack The Ripper',
      lastmessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
      time: 'Сейчас',
      isMe: true,
      newMessagesCount: null,
      isRead: true,
    },
    {
      avatar: 'https://source.unsplash.com/random/2',
      isOnline: false,
      name: '222',
      lastmessage: 'Напиши как сможешь',
      time: '13:01',
      isMe: false,
      newMessagesCount: null,
      isRead: false,
    },
    {
      avatar: 'https://source.unsplash.com/random/3',
      isOnline: false,
      name: '333',
      lastmessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
      time: 'Сейчас',
      isMe: false,
      newMessagesCount: null,
      isRead: true,
    },
    {
      avatar: 'https://source.unsplash.com/random/4',
      isOnline: true,
      name: '444',
      lastmessage: 'Напиши как сможешь',
      time: 'Сейчас',
      isMe: false,
      newMessagesCount: 2,
      isRead: false,
    }
  ]
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
              lastmessage={item.lastmessage}
              time={item.time}
              isMe={item.isMe}
              newMessagesCount={item.newMessagesCount}
              isRead={item.isRead}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Sidebar