"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundError = exports.CropCalendarExistsError = exports.RequestAlreadyAccepted = exports.userAutheticationError = exports.DupliccateUserError = exports.DuplicateEntityError = exports.DuplicatePhoneNumberError = exports.CustomError = void 0;
class CustomError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
class DuplicatePhoneNumberError extends CustomError {
    constructor(message = "phone Number already exits") {
        super(message, 409);
    }
}
exports.DuplicatePhoneNumberError = DuplicatePhoneNumberError;
class DuplicateEntityError extends CustomError {
    constructor(message = "entity already exits") {
        super(message, 409);
    }
}
exports.DuplicateEntityError = DuplicateEntityError;
class DupliccateUserError extends CustomError {
    constructor(message = "user already exits") {
        super(message, 409);
    }
}
exports.DupliccateUserError = DupliccateUserError;
class userAutheticationError extends CustomError {
    constructor(message = "user not found with this credentials") {
        super(message, 404);
    }
}
exports.userAutheticationError = userAutheticationError;
class RequestAlreadyAccepted extends CustomError {
    constructor(message = `request already accepted`) {
        super(message, 409);
    }
}
exports.RequestAlreadyAccepted = RequestAlreadyAccepted;
class CropCalendarExistsError extends CustomError {
    constructor(message = `crop calendar already exists for this request`) {
        super(message, 409);
    }
}
exports.CropCalendarExistsError = CropCalendarExistsError;
class EntityNotFoundError extends CustomError {
    constructor(message = `entity not found`) {
        super(message, 404);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
