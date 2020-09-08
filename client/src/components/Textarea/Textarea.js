import React, { useState, useEffect } from 'react'
import { Picker } from 'emoji-mart'
import smileSvg from 'assets/icons/smile.svg'
import sendSvg from 'assets/icons/send.svg'
import { useHttp, useMessage } from 'hooks'

const Textarea = ({ dialogId, user }) => {
   const { request } = useHttp()
   const message = useMessage()

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

   const keyHandler = e => {
      if (e.keyCode === 13) sendHandler()
   }

   const sendHandler = () => {
      try {
         if (value) {
            await request(`/api/message/`, 'POST ', { text: value, dialog: dialogId }, { auth: `Che ${user.token}` })
            setValue('')
         }
      } catch (e) {
         message(e.message)
      }
   }
   
   return (
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
               <img src={sendSvg} alt="" onClick={() => { }} />
            </div>
         </div>
      </div>
   )
}

export default Textarea