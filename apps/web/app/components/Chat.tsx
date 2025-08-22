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
const Chat = ({ data }: ChatProps) => {
  return (
    <div className='m-2 mb-6'>
      <div className='text-pink-500 bg-neutral-900 rounded-sm p-2'>{data.message}</div>
      <div className='text-xs opacity-45' >@{data?.userId}</div>
    </div>
  )
}

export default Chat