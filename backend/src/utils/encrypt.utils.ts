
import bcrypt from 'bcryptjs';

export const encryptPassword = (password:string):string =>{
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password,salt);
}


export const checkPassword = (plainPassword:string,hashedPassword:string):boolean=>{
   return bcrypt.compareSync(plainPassword,hashedPassword)
}