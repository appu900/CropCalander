import { encryptPassword } from "../utils/encrypt.utils";
import { AgriExpertRequestDto, AgriExpertResponseDto } from "../dtos/Agriexpert.dto";
import { prisma } from "../prisma/client";
import { generateToken } from "../utils/token.utils";
import { DupliccateUserError } from "../utils/application.errors";

class AgriExpertService {
  async createAgriExpert(requestData: AgriExpertRequestDto):Promise<AgriExpertResponseDto> {
    try {
      const existingAgriExpert = await prisma.agriExpert.findFirst({
        where: {
          OR: [
            {
              email: requestData.email,
            },
            {
              phoneNumber: requestData.phoneNumber,
            },
          ],
        },
      });
      if(existingAgriExpert){
        throw new DupliccateUserError("User with this email or phone number already exists")
      } 
      const hashedPassword = encryptPassword(requestData.password);
      const newAgriExpert = await prisma.agriExpert.create({
        data: {
          ...requestData,
          password: hashedPassword,
        },
      });
      const jwtToken = generateToken(newAgriExpert.id);
      return {
        id:newAgriExpert.id,
        name:newAgriExpert.name,
        token:jwtToken
      }
    } catch (error) {
      throw error;
    }
  }
}


export default AgriExpertService