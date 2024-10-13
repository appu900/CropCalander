
import jwt from "jsonwebtoken";

export const generateToken = (userId:number,role:string)=> {
  const token = jwt.sign({ userId,role }, "hello world", {
    expiresIn: "10h",
  });
  return token;
    
}