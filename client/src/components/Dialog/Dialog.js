import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import { Message, Top, Textarea } from 'components'
import { useSelector } from 'react-redux'

const Dialog = () => {
  const user = useSelector(state => state.user)

  return (
    <div className="Dialog">
      <Top name={user.name} />
      <div id="messages" className="Dialog__messages">
        <Message isMe="true" />
        <Message isMe="true" />
        <Message />
        <Message isMe="true" />
      </div>
      <Textarea />
    </div>
  )
}

export default Dialog