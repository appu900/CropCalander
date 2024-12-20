
import { Request,Response,NextFunction } from "express"
import { plainToClass } from "class-transformer"
import { validate, ValidationError } from "class-validator";

export function validateDTO(dtoClass:any){
    return (req:Request,res:Response,next:NextFunction) =>{
       const dtoObject = plainToClass(dtoClass,req.body);
       validate(dtoObject).then((errors:ValidationError[]) =>{
            if(errors.length > 0){
                const message = errors.map((error:ValidationError) => Object.values(error.constraints || {})).join(', ');
                res.status(400).json({message})
            }else{
                next();
            }
       })
    }
}







