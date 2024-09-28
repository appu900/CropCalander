import { prisma } from "../prisma/client";
import {
  CreateFarmerDTO,
  FarmerLoginDTO,
  FarmerResponseDTO,
} from "../dtos/farmer.dto";
import { checkPassword, encryptPassword } from "../utils/encrypt.utils";
import {
  DuplicatePhoneNumberError,
  userAutheticationError,
} from "../utils/application.errors";
import { generateToken } from "../utils/token.utils";

class FarmerService {
  async createFarmer(data: CreateFarmerDTO): Promise<FarmerResponseDTO> {
    try {
      const hashedPassword: string = encryptPassword(data.password);
      const existingFarmer = await prisma.farmer.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
      if (existingFarmer) {
        throw new DuplicatePhoneNumberError(
          "user with Phone Number already exists"
        );
      }
      const farmer = await prisma.farmer.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phoneNumber: data.phoneNumber,
        },
      });
      const jwtToken = generateToken(farmer.id);
      return {
        name: farmer.name,
        email: farmer.email,
        phoneNumber: farmer.phoneNumber,
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async farmerLogin(data: FarmerLoginDTO):Promise<FarmerResponseDTO>{
    try {
      const farmer = await prisma.farmer.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
      if (!farmer) {
        throw new userAutheticationError(
          `user not found with this ${data.phoneNumber}`
        );
      }
      const correctPasssword = checkPassword(data.password,farmer.password);
      if(!correctPasssword){
        throw new userAutheticationError("Invalid Password")
      }

      const jwtToken = generateToken(farmer.id);
      return {
        name:farmer.name,
        email:farmer.email,
        phoneNumber:farmer.phoneNumber,
        token:jwtToken
      }
    } catch (error) {
      throw error;
    }
  }
}

export default FarmerService;
