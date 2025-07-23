import express from "express";
import {
  AuthenticateFarmer,
  handleFarmerAuthRegistrationHandler,
  LoginFarmer,
  RegenerateOTP,
} from "../v2/auth/Farmer";
import { AuthenticateExpert, handleExpertAuthRegistrationHandler } from "../v2/auth/Expert";
const route = express.Router();

route.post("/farmer/register", handleFarmerAuthRegistrationHandler);
route.post("/farmer/authenticate", AuthenticateFarmer);

route.post("/send-otp", RegenerateOTP);

route.post("/expert/register",handleExpertAuthRegistrationHandler)
route.post("/expert/authenticate",AuthenticateExpert)

route.post("/farmer/login",LoginFarmer);




export default route;
