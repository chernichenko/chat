import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Picker } from 'emoji-mart'
import smileSvg from 'assets/icons/smile.svg'
import sendSvg from 'assets/icons/send.svg'
import Message from 'components/Message/Message'

const Dialog = () => {
  const [value, setValue] = useState('')
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)

  useEffect(() => {
    let messagesWrap = document.getElementById('messages')
    messagesWrap.scrollTop = messagesWrap.scrollHeight
  }, [])

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setValue(value + emoji)
    setIsEmojiOpen(false)
  }

  const sendHandler = () => {
    console.log('Send', value)
  }

  const keyHandler = e => {
    if(e.keyCode === 13) sendHandler()
  }

  return (
    <div className="Dialog">
      <div className="Dialog__top"> 
        <div className="Dialog__name">Гай Юлий Цезарь</div>
        <div className="Dialog__status">
          <div className="circle"></div>
          <span>онлайн</span>
        </div>
      </div>

      <div id="messages" className="Dialog__messages">
        <Message isMe="true" />
        <Message isMe="true" />
        <Message />
        <Message isMe="true" />
      </div>

      <div className="Dialog__input-wrap">
        {isEmojiOpen
        ? <div className="Dialog__emoji-picker">
          <Picker 
            onSelect={emojiTag => addEmoji(emojiTag)} 
            set="apple"
          />
        </div>
        : <div className="Dialog__emoji-button">
          <img src={smileSvg} alt="" onClick={() => setIsEmojiOpen(true)} />
        </div>}
        
        <div className="Input">
          <input
            placeholder="Введите текст сообщения…"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={keyHandler}
          />
          <div className="send" onClick={sendHandler}>
            <img src={sendSvg} alt="" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog