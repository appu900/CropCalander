"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Farmer_1 = require("../v2/auth/Farmer");
const Expert_1 = require("../v2/auth/Expert");
const route = express_1.default.Router();
route.post("/farmer/register", Farmer_1.handleFarmerAuthRegistrationHandler);
route.post("/farmer/authenticate", Farmer_1.AuthenticateFarmer);
route.post("/send-otp", Farmer_1.RegenerateOTP);
route.post("/expert/register", Expert_1.handleExpertAuthRegistrationHandler);
route.post("/expert/authenticate", Expert_1.AuthenticateExpert);
route.post("/farmer/login", Farmer_1.LoginFarmer);
exports.default = route;
