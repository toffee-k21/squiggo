import { JWT_SECRET } from "@repo/common-backend/config";
import jwt from "jsonwebtoken";

export function authenticateUser(url:string | undefined){
  if(!url) return null;

  try {
    const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token');
    if(!token)  return null;
    const id:string = jwt.verify(token, JWT_SECRET) as string;
    return id || null;
  }
    catch(e){
      console.log(e);
      return null;
    }
}