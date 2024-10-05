
import { CropCalendarExistsError } from "../utils/application.errors";
import { prisma } from "../prisma/client";

class CropCelendarService {
  async createCropCalendar(requestId: number, expertId: number) {
    try {

      const cropCalendar = await prisma.cropCalandar.findFirst({
        where:{
            requestId:requestId
        }
      })  
      if(cropCalendar){
        throw new CropCalendarExistsError("Crop Calendar already exists")
      }
      const request = await prisma.cropCalandarRequest.findUnique({
        where: {
          id: requestId,
        },
      });
      if (!request) {
        throw new Error("Request not found");
      }

      const payload = {
        requestId: requestId,
        expertId: expertId,
        season: request.season,
        createdAt: new Date(),
      };

      const response = await prisma.cropCalandar.create({
        data: payload,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default CropCelendarService;
