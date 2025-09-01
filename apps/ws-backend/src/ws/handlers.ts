import { publishMessage } from "../services/messageService";
import { joinRoom, leaveRoom } from "../services/roomService";
import { isRoomExists } from "../utils/room"

interface Data {
    message : string;
    roomId : number;
    type : string;
}

export const handleMessage = async ( parsed:Data, userId:string) =>{
    if(!(await isRoomExists(parsed.roomId))) return false;
    
    switch(parsed.type){
        case "join_room" : {
            await joinRoom(parsed.roomId, userId);
            break;
        }
        case "leave_room" : {
            await leaveRoom(parsed.roomId, userId);
            break;
        }
        case "chat":
        case "sketch" : {
            await publishMessage(parsed.roomId, parsed.type, parsed.message, userId);
            break;
        }
    }

}