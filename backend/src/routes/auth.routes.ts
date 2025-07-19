import express from "express";
import {
  AuthenticateFarmer,
  handleFarmerAuthRegistrationHandler,
  RegenerateOTP,
} from "../v2/auth/Farmer";
import { AuthenticateExpert, handleExpertAuthRegistrationHandler } from "../v2/auth/Expert";
const route = express.Router();

route.post("/farmer/register", handleFarmerAuthRegistrationHandler);
route.post("/farmer/authenticate", AuthenticateFarmer);

route.post("/resend-otp", RegenerateOTP);

route.post("/expert/register",handleExpertAuthRegistrationHandler)
route.post("/expert/authenticate",AuthenticateExpert)

export default route;
