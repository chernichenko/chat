import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import { Message, Loader } from 'components'

import format from 'date-fns/format'
import isToday from 'date-fns/is_today'

const Messages = ({ isLoader, messages, userMy, userTo }) => {

    const getMessageTime = createdAt => {
        if (isToday(createdAt)) {
            return format(createdAt, 'HH:mm')
        } else {
            return format(createdAt, 'DD.MM.YYYY')
        }
    }

    return (
        <div id="messages" className="Dialog__messages">
            {isLoader
            ? <Loader />
            : messages.length
            ? messages.map(message => {
                const isMe = userMy.id.toString() === message.user.toString()
                const avatarUrl = isMe ? userMy.avatarUrl : userTo.avatarUrl

                return (
                    <Message
                        text={message.text}
                        avatarUrl={avatarUrl}
                        isMe={isMe}
                        isRead={message.isRead}
                        time={'Вчера, в 13:23'}
                    />
                )
            })
            : <span className="Dialog__no-messages">Сообищений пока нет.</span>}
        </div>
    )
}

export default Messages