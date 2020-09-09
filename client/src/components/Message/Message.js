import React from 'react'
import classNames from 'classnames/bind'

const Message = ({ text, avatarUrl, isMe, isRead, time }) => {
   let cls = classNames({
      'Message': true,
      'me': isMe
   })

   return (
      <div className={cls}>
         <div className="Message__avatar">
            <img src={avatarUrl} alt="" />
         </div>
         <div className="Message__content">
            <div className="Message__text">{text}</div>
            <div className="Message__time">{time}</div>
         </div>
      </div>
   )
}

export default Message