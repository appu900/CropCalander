export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DuplicatePhoneNumberError extends CustomError {
  constructor(message: string = "phone Number already exits") {
    super(message, 409);
  }
}

  

export class DupliccateUserError extends CustomError{
  constructor(message:string="user already exits"){
    super(message,409)
  }
}

export class userAutheticationError extends CustomError{
   constructor(message:string="user not found with this credentials"){
    super(message,404)
   }
}

export class RequestAlreadyAccepted extends CustomError{
  constructor(message:string=`request already accepted`){
    super(message,409)
  }
}

export class CropCalendarExistsError extends CustomError{
  constructor(message:string=`crop calendar already exists for this request`){
    super(message,409)
  }
}