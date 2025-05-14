import Chat from './Chat'
import { cookies } from 'next/headers';
import config from '../utils.json';

const backend_url = config.backend_url;
interface ChatProps {
    id: number,
    type: string,
    roomId: number,
    message: string,
    userId: string
}
const ChatRoom = async ({roomId}:{roomId: number}) => {

  let chats;

  const Id = roomId;
  console.log(Id)

     const handleFetchChats = async (id: number) => {
          const token = (await cookies()).get("token")?.value;
          console.log(token);
          const resp = await fetch(`${backend_url}/room/chat/${id}`, {
              headers: {
                  authorization: `Bearer ${token}`
              }
          });
          console.log(resp);
          const data = await resp.json();
          console.log(data)
          return data;
      }

      const c = await handleFetchChats(Id);
      chats = c;

  return (
    <div>
      <div>ChatRoom</div>
      {
        chats.map((chat:ChatProps)=>{
         return <li><Chat data={chat}/></li>
        })
      }
    </div>
  )
}

export default ChatRoom;