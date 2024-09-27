import { Request,Response,NextFunction } from "express"
import { StatusCodes } from "http-status-codes";
export const errorHandler = (error:Error,req:Request,res:Response,next:NextFunction)=>{
   console.log(error.stack);
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    ok:false,
    message:error.message || 'An unexpected error occurred'
   })
}