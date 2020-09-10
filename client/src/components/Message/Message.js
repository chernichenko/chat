import React from 'react'
import classNames from 'classnames/bind'
import checkSvg from 'assets/icons/check.svg'
import noCheckSvg from 'assets/icons/no-check.svg'

const Message = ({ text, avatarUrl, isMe, isRead, time }) => {
   let cls = classNames({ 'Message': true, 'me': isMe })

   return (
      <div className={cls}>
         <div className="Message__avatar">
            <img src={avatarUrl} alt="" />
         </div>
         <div className="Message__content">
            <div className="Message__text">{text}</div>
            <div className="Message__time">{time}</div>
            {isMe && <div className="Message__is-check">
               <img src={isRead ? checkSvg : noCheckSvg} alt="" />
            </div>}
         </div>
      </div>
   )
}

export default Message