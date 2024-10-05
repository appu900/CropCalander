import {
  CropCalendarExistsError,
  EntityNotFoundError,
} from "../utils/application.errors";
import { prisma } from "../prisma/client";
import { CropCalendarActivityDTO } from "../dtos/Cropcalendar";

class CropCelendarService {
  // ** generate crop calendar for a request
  async createCropCalendar(requestId: number, expertId: number) {
    try {
      const cropCalendar = await prisma.cropCalandar.findFirst({
        where: {
          requestId: requestId,
        },
      });
      if (cropCalendar) {
        throw new CropCalendarExistsError("Crop Calendar already exists");
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

  //   ** generate activity for a crop calendar
  async createActivities(
    cropCalendarId: number,
    cropcalendarActivityPayload: CropCalendarActivityDTO[]
  ) {
    try {
      console.log(cropcalendarActivityPayload);
      const cropCalendar = await prisma.cropCalandar.findUnique({
        where: {
          id: cropCalendarId,
        },
        select: {
          id: true,
        },
      });
      if (!cropCalendar) {
        throw new EntityNotFoundError("Crop Calendar not found");
      }

      return prisma.$transaction(async (prismaInstance) => {
        const activitiesData = cropcalendarActivityPayload.map((activity) => ({
          ...activity,
          calandarId: cropCalendar.id,
        }));

        // ** insert Data in bulk

        const createdActivities = await prismaInstance.activity.createMany({
          data: activitiesData,
        });

        return true;
      });
    } catch (error) {
      throw error;
    }
  }
}

export default CropCelendarService;