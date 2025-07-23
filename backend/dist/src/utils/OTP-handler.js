"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const axios_1 = __importDefault(require("axios"));
const sendOTP = async (phoneNumber, otp) => {
    try {
        const templateid = "1007161519960183117";
        let message = "Dear User,Your OTP for login is:" + otp + " With Regards,GTIDS IT Team";
        const smsurl = `https://smslogin.co/v3/api.php?username=gramtarang&apikey=2279de0891389c8d3a33&senderid=GTIDSP&templateid=${templateid}&mobile=${phoneNumber}&message=${encodeURIComponent(message)}`;
        const response = await axios_1.default.post(smsurl);
        console.log(response);
    }
    catch (error) {
        console.error("something went wromg in sending otp");
    }
};
exports.sendOTP = sendOTP;
