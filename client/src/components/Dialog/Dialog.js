import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Message, Top, Textarea } from 'components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'

const Dialog = () => {
  const { request } = useHttp()
  const message = useMessage()

  const userMy = useSelector(state => state.user)
  let { userToId } = useParams()
  const [userTo, setUserTo] = useState({})

  const [dialog, setDialog] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getInfo = async () => { 
      try {
        const userToResponse = await request(`/api/user/`, 'GET', { userToId }, { auth: `Che ${userMy.token}` })
        setUserTo(userToResponse)
        // console.log('userToResponse', userToResponse)
  
        const dialogResponse = await request(`/api/dialog/`, 'GET', { userToId }, { auth: `Che ${userMy.token}` })
        setDialog(dialogResponse)
        console.log('dialogResponse', dialogResponse)
  
        // if (dialogResponse.lastMessage) {
        //   const messagesResponse = await request(`/api/messages/`, 'GET', { dialogId: dialogResponseId }, { auth: `Che ${userMy.token}` })
        //   setMessages(messagesResponse)
        // }
      } catch (e) {
        message(e.message)
      }
    }
    
    getInfo()
  }, [userToId]) // eslint-disable-line

  return (
    <div className="Dialog">
      <Top name={userTo.name} />
      <div id="messages" className="Dialog__messages">
        {messages.length
          ? <>
            <Message isMe="true" />
            <Message isMe="true" />
            <Message />
            <Message isMe="true" />
          </>
          : <span className="Dialog__no-messages">Сообищение пока нет.</span>}
      </div>
      <Textarea
        dialogId={dialog.id}
        user={userMy}
      />
    </div>
  )
}

export default Dialog