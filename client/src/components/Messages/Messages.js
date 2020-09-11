import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import { Message, Loader } from 'components'
import { getFormatedTime } from 'utils/date'

const Messages = ({ isLoader, messages, userMy, userTo }) => {

    return (
        <div id="messages" className="Dialog__messages">
            {isLoader 
            ? <Loader />
            : (messages && messages.length)
            ? messages.map((message, index) => {
                const isMe = userMy.id.toString() === message.user.toString()
                const avatarUrl = isMe ? userMy.avatarUrl : userTo.avatarUrl

                return (
                    <Message
                        key={index}
                        text={message.text}
                        avatarUrl={avatarUrl}
                        isMe={isMe}
                        isRead={message.isRead}
                        time={getFormatedTime(new Date(message.createdAt))}
                    />
                )
            })
            : <span className="Dialog__no-messages">Сообищений пока нет.</span>}
        </div>
    )
}

export default Messages