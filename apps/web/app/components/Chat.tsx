import React from 'react'

interface ChatProps {
    data: {
        id?: number,
        type: string,
        roomId: number,
        message: string,
        userId?: string
    }
}
const Chat = ({data}: ChatProps) => {
  return (
    <div key={data.id}>{data.message}</div>
  )
}

export default Chat