'use client'
import { useState, useRef, useEffect } from 'react'
import { FullMessageType } from "@app/types"
import useChat from '@app/hooks/useChat'
import MessageBox from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@app/libs/pusher'
import { find } from 'lodash'

type BodyProps = {
  initialMessages: FullMessageType[]
}

const Body = ({ initialMessages }: BodyProps) => {

  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useChat();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })

      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage
        }
        return currentMessage
      }))
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('messages:update', updateMessageHandler)
    return () =>
    {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('messages:update', updateMessageHandler)
    }
    
  }, [ conversationId])


  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-'/>
    </div>
  )
}

export default Body