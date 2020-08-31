import './Sidebar.scss'
import React from 'react'

const Sidebar = () => {
  let dialogs = [
    {
      avatar: '',
      isOnline: true,
      name: 'Jack The Ripper',
      lastmessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
      time: 'Сейчас',
      isMe: true,
      newMessagesCount: null,
      isRead: true,
    },
    {
      avatar: '',
      isOnline: false,
      name: '222',
      lastmessage: 'Напиши как сможешь',
      time: '13:01',
      isMe: false,
      newMessagesCount: null,
      isRead: false,
    },
    {
      avatar: '',
      isOnline: false,
      name: '333',
      lastmessage: 'Го в WatcpApp, я создал. Напиши как сможешь',
      time: 'Сейчас',
      isMe: false,
      newMessagesCount: null,
      isRead: true,
    },
    {
      avatar: '',
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
        {dialogs.map(() => {
          
        })}
      </div>
    </div>
  );
};

export default Sidebar