import { prisma } from "../prisma/client";
import { CreateFarmerDTO, FarmerResponseDTO } from "../dtos/farmer.dto";
import { encryptPassword } from "../utils/encrypt.utils";
import { DuplicatePhoneNumberError } from "../utils/application.errors";

class FarmerService {
  async createFarmer(data: CreateFarmerDTO):Promise<FarmerResponseDTO> {
    try {
      const hashedPassword:string = encryptPassword(data.password);
      const existingFarmer = await prisma.farmer.findUnique({
        where:{
            phoneNumber:data.phoneNumber
        }
      })
      if(existingFarmer){
        throw new DuplicatePhoneNumberError("user with Phone Number already exists")
      }
      const farmer = await prisma.farmer.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phoneNumber:data.phoneNumber,
        },
      });
       return {
        name: farmer.name,
        email: farmer.email,
        phoneNumber: farmer.phoneNumber,
        token:"token"
       }
    } catch (error) {
      throw error;
    }
  }
}


export default FarmerService