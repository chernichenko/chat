import React from 'react'
import classNames from 'classnames/bind'

const Message = ({ isMe }) => {
   let cls = classNames({
      'Message': true,
      'me': isMe
   })

   return (
      <div className={cls}>
         <div className="Message__avatar">
            <img src="https://source.unsplash.com/random/1" alt="" />
         </div>
         <div className="Message__content">
            <div className="Message__text">123</div>
            <div className="Message__time">Вчера, в 13:23</div>
         </div>
      </div>
   )
}

export default Message