import { checkPassword, encryptPassword } from "../utils/encrypt.utils";
import {
  AgriExpertLoginRequestDTO,
  AgriExpertRequestDto,
  AgriExpertResponseDto,
} from "../dtos/Agriexpert.dto";
import { prisma } from "../prisma/client";
import { generateToken } from "../utils/token.utils";
import {
  DupliccateUserError,
  userAutheticationError,
} from "../utils/application.errors";

class AgriExpertService {
  async createAgriExpert(
    requestData: AgriExpertRequestDto
  ): Promise<AgriExpertResponseDto> {
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

      if (existingAgriExpert) {
        throw new DupliccateUserError(
          "User with this email or phone number already exists"
        );
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
        id: newAgriExpert.id,
        name: newAgriExpert.name,
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }

  //   ** purpose login a agri expert with email and password

  async agriExpertLogin(
    loginData: AgriExpertLoginRequestDTO
  ): Promise<AgriExpertResponseDto> {
    try {
      const agriExpert = await prisma.agriExpert.findFirst({
        where: {
          email: loginData.email,
        },
      });
      if (!agriExpert) {
        throw new userAutheticationError(
          `User not found with this ${loginData.email}`
        );
      }
      const correctPassword = checkPassword(
        loginData.password,
        agriExpert.password
      );
      if (!correctPassword) {
        throw new userAutheticationError("Invalid Password");
      }
      const jwtToken = generateToken(agriExpert.id);
      return {
        id: agriExpert.id,
        name: agriExpert.name,
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }

  // ** asign agri expert for a cropCalanderrequest

  async acceptRequest(expertId: number, requestedCropCalandarId: number) {
    try {
      return await prisma.$transaction(async (prisma) => {
        const request = await prisma.$queryRaw`
      SELECT * 
      FROM "CropCalandarRequest"
      WHERE id = ${requestedCropCalandarId}
      AND "status" = 'PENDING'
      AND "expertId" IS NULL
      FOR UPDATE
    `;

        if (!request) {
          throw new Error("Request already accepted");
        }

        const updatedRequest = await prisma.cropCalandarRequest.update({
          where: {
            id: requestedCropCalandarId,
          },
          data: {
            status: "ACCEPTED",
            expertId: expertId,
          },
        });

        return updatedRequest;
      });
    } catch (error) {
      throw error;
    }
  }

  // ** get all cropcalander request assigned to a agriexpert

  async getRequestsByExpertId(expertId: number) {
    try {
      const response = await prisma.cropCalandarRequest.findMany({
        where: {
          expertId: expertId,
        },
        include:{
          cropCalandar:{
            select:{
              id:true,
              season:true,
              createdAt:true,
              activities:true
            }
          }
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AgriExpertService;
