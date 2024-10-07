import {
  CropCalanderRequestDTO,
  CropCalendarReqResponseDTO,
  CropCalendarRequestMapper,
} from "../dtos/CropcalanderRequest";
import { prisma } from "../prisma/client";

class CropCalanderRequestService {
  async createCropCalanderRequest(
    farmerId: number,
    payload: CropCalanderRequestDTO
  ): Promise<CropCalendarReqResponseDTO> {
    try {
      const response = await prisma.cropCalandarRequest.create({
        data: {
          farmerId: farmerId,
          cropName: payload.cropName,
          season: payload.season,
          location: payload.location,
          filedSize: payload.fieldSize,
          startDate: payload.startDate,
          cropType: payload.cropType,
          projectName:payload.projectName,
          projectDescription:payload.projectDescription,
          seedVaraity:payload.seedVaraity
        },
      });
      return {
        id: response.id,
        farmerId: response.farmerId,
        cropName: response.cropName,
        season: response.season,
        location: response.location,
        startDate: response.startDate,
        cropType: response.cropType,
        status: response.status,
        projectName:response.projectName??"",
        projectDescription:response.projectDescription??""
      };
    } catch (error) {
      throw error;
    }
  }

  // ** get all cropcalander request with pending status

  async getAllPendingCropCalanderRequest(): Promise<
    CropCalendarReqResponseDTO[]
  > {
    try {
      const response = await prisma.cropCalandarRequest.findMany({
        where: {
          status: "PENDING",
        },
      });
      const responseObj = CropCalendarRequestMapper.toDTOList(response);
      return responseObj;
    } catch (error) {
      throw error;
    }
  }

  async findCropCalandersRequestByFarmerId(farmerId: number) {
    try {
      const response = await prisma.cropCalandarRequest.findMany({
        where: {
          farmerId: farmerId,
        },
        include: {
          expert: {
            select: {
              name: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default CropCalanderRequestService;
