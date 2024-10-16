import { prisma } from "../prisma/client";
import {
  CreateFarmerDTO,
  FarmerCropCalendarActivityDTO,
  FarmerCropCalendarCreationDTO,
  FarmerLoginDTO,
  FarmerResponseDTO,
} from "../dtos/farmer.dto";
import { checkPassword, encryptPassword } from "../utils/encrypt.utils";
import {
  DuplicatePhoneNumberError,
  EntityNotFoundError,
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
          profilePic: data.profilePic
            ? data.profilePic
            : "https://avatar.iran.liara.run/public/23",
          address: data.address,
        },
      });
      const jwtToken = generateToken(farmer.id, farmer.role);
      return {
        name: farmer.name,
        email: farmer.email,
        phoneNumber: farmer.phoneNumber,
        token: jwtToken,
        role: farmer.role,
        profilePic: farmer.profilePic,
      };
    } catch (error) {
      throw error;
    }
  }

  async farmerLogin(data: FarmerLoginDTO): Promise<FarmerResponseDTO> {
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
      const correctPasssword = checkPassword(data.password, farmer.password);
      if (!correctPasssword) {
        throw new userAutheticationError("Invalid Password");
      }

      const jwtToken = generateToken(farmer.id, farmer.role);
      return {
        name: farmer.name,
        email: farmer.email,
        phoneNumber: farmer.phoneNumber,
        token: jwtToken,
        role: farmer.role,
        profilePic: farmer.profilePic,
      };
    } catch (error) {
      throw error;
    }
  }

  // ** create own cropcalendar SERVICE METHOD

  async createOwnCropCalendar(
    payload: FarmerCropCalendarCreationDTO,
    farmerId: number
  ) {
    try {
      const cropCalendar = await prisma.farmerCropCalendar.create({
        data: {
          projectName: payload.projectName,
          projectDescription: payload.projectDescription,
          cropName: payload.cropName,
          cropType: payload.cropType,
          fieldSize: payload.fieldSize,
          seedVariety: payload.seedVariety,
          location: payload.location,
          season: payload.season,
          startDate: payload.startDate,
          farmerId: farmerId,
        },
      });
      return cropCalendar;
    } catch (error) {
      throw error;
    }
  }

  // ** update activity status of a cropcalendar of a farmer..

  async addActivityToCropcalendar(
    payload: FarmerCropCalendarActivityDTO,
    cropCalendarId: number
  ) {
    try {
      const cropCalendar = await prisma.farmerCropCalendar.findUnique({
        where: {
          id: cropCalendarId,
        },
      });

      if (!cropCalendar) {
        throw new EntityNotFoundError("CropCalendar not found");
      }

      const updatedCropCalendar =
        await prisma.farmerCropCalendarActivity.create({
          data: {
            activityName: payload.activityName,
            description: payload.description,
            startTime: payload.startTime,
            endTime: payload.endTime,
            farmerCropCalendarId: cropCalendarId,
          },
        });
      return updatedCropCalendar;
    } catch (error) {
      throw error;
    }
  }

  // ** get all cropcalendar  for farmer

  async getALLCropCalendarOfFarmer(farmerId: number) {
    try {
      const calendars = await prisma.farmerCropCalendar.findMany({
        where: {
          farmerId: farmerId,
        },
        include: {
          FarmerCropCalendarActivity: true,
        },
      });
      return calendars;
    } catch (error) {
      throw error;
    }
  }

  // ** Farmer will make a post.

  async createPost(postContent: string, imageUrl: string, farmerId: number) {
    try {
      const post = await prisma.post.create({
        data: {
          content: postContent,
          image: imageUrl,
          farmerId: farmerId,
          postedByType: "FARMER",
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async updateImageToActivity(
    imageUrl: string,
    caption: string,
    activityId: number,
    farmerId: number
  ) {
    try {
      const response = await prisma.$transaction([
        prisma.farmerCropCalendarActivity.update({
          where: {
            id: activityId,
          },
          data: {
            image: imageUrl,
            caption: caption,
          },
        }),

        prisma.post.create({
          data: {
            content: caption,
            image: imageUrl,
            farmerId: farmerId,
            postedByType: "FARMER",
          },
        }),
      ]);
      return{
        activity: response[0],
        post: response[1]
      };
    } catch (error) {
      throw error;
    }
  }
}

export default FarmerService;

// ** farmer can make a post
// ** post will contain title description
// ** profile picture
// ** role based authetication .
// ** Agri expert will just
