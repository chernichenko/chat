import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Picker } from 'emoji-mart'
import TextareaAutosize from 'react-textarea-autosize'
import smileSvg from 'assets/icons/smile.svg'

const Dialog = () => {
  const [value, setValue] = useState('')
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)

  console.log(isEmojiOpen)

  useEffect(() => {
    console.log(value)
  }, [value])

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setValue(value + emoji)
    setIsEmojiOpen(false)
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

      <div className="Dialog__messages">

        <div className="Message me">
          <div className="Message__avatar">
            <img src="https://source.unsplash.com/random/1" alt="" />
          </div>
          <div className="Message__content">
            <div className="Message__text">Салам, брат Цезарь!</div>
            <div className="Message__time">Вчера, в 13:23</div>
          </div>
        </div>

        <div className="Message me">
          <div className="Message__avatar">
            <img src="https://source.unsplash.com/random/1" alt="" />
          </div>
          <div className="Message__content">
            <div className="Message__text">Салам, брат Цезарь! Салам, брат Цезарь! Салам, брат Цезарь! Салам, брат Цезарь!</div>
            <div className="Message__time">Вчера, в 13:23</div>
          </div>
        </div>

        <div className="Message">
          <div className="Message__avatar">
            <img src="https://source.unsplash.com/random/2" alt="" />
          </div>
          <div className="Message__content">
            <div className="Message__text">Салам, брат Цезарь!</div>
            <div className="Message__time">Вчера, в 13:23</div>
          </div>
        </div>

        <div className="Message me">
          <div className="Message__avatar">
            <img src="https://source.unsplash.com/random/1" alt="" />
          </div>
          <div className="Message__content">
            <div className="Message__text">Салам, брат Цезарь!</div>
            <div className="Message__time">Вчера, в 13:23</div>
          </div>
        </div>

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
        
        <TextareaAutosize 
          size="large"
          placeholder="Введите текст сообщения…"
          value={value}
          onChange={e => setValue(e.target.value)}
          maxRows={3}
        />
      </div>
    </div>
  )
}

export default Dialog