import React, { useState } from 'react'
import { useHttp, useMessage } from 'hooks'
import TextareaTemplate from './TextareaTemplate'

const Textarea = ({ dialogId, user, setMessages, scrollMessages }) => {
   const { request } = useHttp()
   const message = useMessage()

   const [value, setValue] = useState('')
   const [isEmojiOpen, setIsEmojiOpen] = useState(false)

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

   const sendHandler = async () => {
      try {
         if (value) {
            const newMessage = await request(`/api/message/`, 'POST', { text: value, dialog: dialogId }, { auth: `Che ${user.token}` })
            setMessages(prevMessages => {
               return {
                  ...prevMessages,
                  newMessage
               }
            })
            scrollMessages()
            setValue('')
         }
      } catch (e) {
         message(e.message)
      }
   }
   
   return (
      <TextareaTemplate
         isEmojiOpen={isEmojiOpen}
         addEmoji={addEmoji}
         setIsEmojiOpen={setIsEmojiOpen}
         value={value}
         setValue={setValue}
         keyHandler={keyHandler}
         sendHandler={sendHandler}
      />
   )
}

export default Textarea