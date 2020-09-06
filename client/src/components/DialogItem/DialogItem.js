import './DialogItem.scss'
import React from 'react'
import generateGradient from 'utils/color'
import check from 'assets/icons/check.svg'
import noCheck from 'assets/icons/no-check.svg'

const DialogItem = ({
  avatar,
  isOnline,
  name,
  lastMessage,
  time,
  isMe,
  isRead,
  newMessagesCount
}) => {

  const { color, colorLighten } = generateGradient('5f4b8fa976c6411cfcd44245')

  console.log(avatar)

  return (
    <div className="DialogItem">
      <div className="DialogItem__column1">
        <div className="DialogItem__avatar-wrap">
          <div className="DialogItem__avatar">
            {avatar 
            ? <img src={avatar} alt=""/>
            : <div 
                className="DialogItem__no-avatar"
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
                }}
              >{name[0].toUpperCase()}</div>}
          </div>
          {isOnline && <div className="DialogItem__online"><span></span></div>}
        </div>
      </div>
      <div className="DialogItem__column2">
        <div className="DialogItem__name">{name}</div>
        <div className="DialogItem__message"><span>{lastMessage}</span></div>
      </div>
      <div className="DialogItem__column3">
        <div className="DialogItem__time">{time}</div>
        {isMe
        ? <div className="DialogItem__message-status">
          <img src={isRead ? check : noCheck} alt="" />
        </div>
        : <div className="DialogItem__message-count">1</div>}
      </div>
    </div>
  );
};

export default DialogItem