import './Dialog.scss'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState, useEffect } from 'react'
import { Top, Textarea } from 'components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHttp, useMessage } from 'hooks'

const Dialog = () => {
  const { request } = useHttp()
  const message = useMessage()

  const userMy = useSelector(state => state.user)
  const headers = { auth: `Che ${userMy.token}` }
  let { userToId } = useParams()
  const [userTo, setUserTo] = useState({})

  const [isLoader, setIsLoader] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [dialog, setDialog] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const getInfo = async () => { 
      try {
        const userToResponse = await request(`/api/user/`, 'GET', { userToId }, headers)
        setUserTo(userToResponse)
        console.log('userToResponse', userToResponse)
  
        const dialogResponse = await request(`/api/dialog/`, 'GET', { userToId }, headers)
        setDialog(dialogResponse)
        console.log('dialogResponse', dialogResponse)
  
        if (dialogResponse.lastMessage) setMessages(getMessages(dialogResponse.id))

        setRefresh(prevState => prevState + 1)
        setIsLoader(false)
      } catch (e) {
        message(e.message)
      }
    }
    
    getInfo()
  }, [userToId]) // eslint-disable-line

  useEffect(() => {
    if (Boolean(refresh)) {
      console.log('refresh')
      setMessages(getMessages(dialog.id))
      setIsLoader(false)
    }
  }, [refresh]) // eslint-disable-line
  
  const getMessages = async dialogId => {
    const messagesResponse = await request(`/api/messages/`, 'GET', { dialogId: dialogId }, headers)
    console.log('messagesResponse', messagesResponse)
    return messagesResponse
  }

  return (
    <div className="Dialog">
      <Top name={userTo.name} />
      <Messages 
        isLoader={isLoader}
        messages={messages}
        userMy={userMy}
        userTo={userTo}
      />
      <Textarea
        dialogId={dialog.id}
        user={userMy}
        setIsLoader={setIsLoader}
        setRefresh={setRefresh}
      />
    </div>
  )
}

export default Dialog