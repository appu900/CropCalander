"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, role) => {
    const token = jsonwebtoken_1.default.sign({ userId, role }, "hello world", {
        expiresIn: "10h",
    });
    return token;
};
exports.generateToken = generateToken;
