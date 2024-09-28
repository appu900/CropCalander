
import jwt from "jsonwebtoken";

export const generateToken = (userId:number)=> {
  const token = jwt.sign({ userId }, "hello world", {
    expiresIn: "10h",
  });
  return token;
    
}