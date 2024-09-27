import { prisma } from "../prisma/client";
import { CreateFarmerDTO, FarmerResponseDTO } from "../dtos/farmer.dto";
import { encryptPassword } from "../utils/encrypt.utils";

class FarmerService {
  async createFarmer(data: CreateFarmerDTO):Promise<FarmerResponseDTO> {
    try {
      const hashedPassword:string = encryptPassword(data.password);
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