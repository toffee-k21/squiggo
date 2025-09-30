import { publishMessage } from "../services/messageService";
import { joinRoom, leaveRoom } from "../services/roomService";
import { isRoomExists } from "../utils/room"

interface Data {
    message : string;
    roomId : string;
    type : string;
}

export const handleMessage = async ( parsed:Data, username:string) =>{
    if(!(await isRoomExists(parsed.roomId))) return false;
    
    switch(parsed.type){
        case "join_room" : {
            await joinRoom(parsed.roomId, username);
            break;
        }
        case "leave_room" : {
            await leaveRoom(parsed.roomId, username);
            break;
        }
        case "chat":
        case "sketch" : {
            await publishMessage(parsed.roomId, parsed.type, parsed.message, username);
            break;
        }
    }

}