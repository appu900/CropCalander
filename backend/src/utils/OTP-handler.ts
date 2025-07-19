import axios from "axios";

export const sendOTP = async (phoneNumber: string, otp: any) => {
  try {
    const templateid = "1007161519960183117";
    let message =
      "Dear User,Your OTP for login is:" + otp + " With Regards,GTIDS IT Team";
    const smsurl = `https://smslogin.co/v3/api.php?username=gramtarang&apikey=2279de0891389c8d3a33&senderid=GTIDSP&templateid=${templateid}&mobile=${phoneNumber}&message=${encodeURIComponent(
      message
    )}`;
    const response = await axios.post(smsurl);
    console.log(response);
  } catch (error) {
    console.error("something went wromg in sending otp");
  }
};



