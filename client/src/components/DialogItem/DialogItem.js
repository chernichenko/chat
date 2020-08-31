import './DialogItem.scss'
import React from 'react'

const DialogItem = ({
  avatar,
  isOnline,
  name,
  lastmessage,
  time,
  isMe,
  newMessagesCount,
  isRead
}) => {
  return (
    <div className="DialogItem">
      <div className="DialogItem__column1">
        <div className="DialogItem__avatar">
          <img src={avatar} alt=""/>
          <div className="DialogItem__online"></div>
        </div>
      </div>
      <div className="DialogItem__column2">
        <div className="DialogItem__name"></div>
        <div className="DialogItem__Message"></div>
      </div>
      <div className="DialogItem__column3">
        <div className="DialogItem__time"></div>
        <div className="DialogItem__message-status"></div>
      </div>
    </div>
  );
};

export default DialogItem