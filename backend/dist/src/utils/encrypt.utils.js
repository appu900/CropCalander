"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encryptPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.encryptPassword = encryptPassword;
const checkPassword = (plainPassword, hashedPassword) => {
    return bcryptjs_1.default.compareSync(plainPassword, hashedPassword);
};
exports.checkPassword = checkPassword;
