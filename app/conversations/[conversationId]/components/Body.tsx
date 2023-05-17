'use client'
import { useState, useRef, useEffect } from 'react'
import { FullMessageType } from "@app/types"
import useChat from '@app/hooks/useChat'
import MessageBox from './MessageBox'
import axios from 'axios'

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