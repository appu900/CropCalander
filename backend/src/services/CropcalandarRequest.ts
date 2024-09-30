import { CropCalanderRequestDTO, CropCalendarReqResponseDTO } from "../dtos/CropcalanderRequest";
import { prisma } from "../prisma/client";

class CropCalanderRequestService {
  async createCropCalanderRequest(farmerId:number,payload: CropCalanderRequestDTO):Promise<CropCalendarReqResponseDTO> {
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
        status:response.status
      };
    } catch (error) {
      throw error;
    }
  }
}

export default CropCalanderRequestService;
