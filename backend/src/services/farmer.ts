import { prisma } from "../prisma/client";
import {
  CreateFarmerDTO,
  FarmerCropCalendarActivityDTO,
  FarmerCropCalendarCreationDTO,
  FarmerLoginDTO,
  FarmerResponseDTO,
  UpdateFarmerDTO,
} from "../dtos/farmer.dto";
import { checkPassword, encryptPassword } from "../utils/encrypt.utils";
import {
  DuplicateEntityError,
  DuplicatePhoneNumberError,
  EntityNotFoundError,
  userAutheticationError,
} from "../utils/application.errors";
import { generateToken } from "../utils/token.utils";
import {
  DroneSprayingFormDTO,
  SmartIrrigationFormDto,
  SoilHealthMapFormDto,
} from "../dtos/ServiceForms.dto";

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
        if (existingFarmer.email === data.email) {
          throw new DuplicatePhoneNumberError("Phone Number already exists");
        }
        throw new DuplicateEntityError("Farmer already exists with this email");
      }
      const farmer = await prisma.farmer.create({
        data: {
          name: data.name,
          email: data.email ?? "",
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

  async updateFarmer(
    farmerId: number,
    data: UpdateFarmerDTO
  ): Promise<FarmerResponseDTO> {
    try {
      const existingFarmer = await prisma.farmer.findUnique({
        where: { id: farmerId },
      });
      if (!existingFarmer) {
        throw new EntityNotFoundError("Farmer not found");
      }

      let hashedPassword: string | undefined;
      if (data.password) {
        hashedPassword = encryptPassword(data.password);
      }

      const updatedFarmer = await prisma.farmer.update({
        where: { id: farmerId },
        data: {
          name: data.name ?? existingFarmer.name,
          email: data.email ?? existingFarmer.email,
          password: hashedPassword ?? existingFarmer.password,
          phoneNumber: data.phoneNumber ?? existingFarmer.phoneNumber,
          profilePic: data.profilePic ?? existingFarmer.profilePic,
        },
      });

      const jwtToken = generateToken(updatedFarmer.id, updatedFarmer.role);

      return {
        name: updatedFarmer.name,
        email: updatedFarmer.email,
        phoneNumber: updatedFarmer.phoneNumber,
        token: jwtToken,
        role: updatedFarmer.role,
        profilePic: updatedFarmer.profilePic,
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
      return {
        activity: response[0],
        post: response[1],
      };
    } catch (error) {
      throw error;
    }
  }

  // ** create a drone spraying form
  async createDroneSprayingForm(farmerId: number, data: DroneSprayingFormDTO) {
    try {
      const response = await prisma.droneSprayingFrom.create({
        data: {
          farmerId: farmerId,
          farmLoaction: data.farmLocation,
          cropType: data.cropType,
          areaInHectares: data.areaInHectares,
          sprayDate: data.sprayDate,
          query: data.query ?? "No query provided",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createSmartIrrigationFrom(
    farmerId: number,
    data: SmartIrrigationFormDto
  ) {
    try {
      const response = await prisma.smartIrrigationForm.create({
        data: {
          farmerId: farmerId,
          farmLoaction: data.farmLocation,
          cropType: data.cropType,
          areaInHectares: data.areaInHectares,
          query: data.query ?? "No query provided",
          irrigationType: data.irrigationType,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ** create a soil health map form

  async createSoilHealthMapForm(farmerId: number, data: SoilHealthMapFormDto) {
    try {
      const response = await prisma.soilHealthMapForm.create({
        data: {
          farmerId: farmerId,
          farmLoaction: data.farmLocation,
          soilType: data.soilType,
          cropType: data.cropType,
          areaInHectares: data.areaInHectares,
          query: data.query ?? "No query provided",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // ** delete farmer data from db including all cropcalandar and activities

  async deleteFarmerData(
    farmerPhoneNumber: string,
    providedPassword: string,
    feeedback: string
  ) {
    try {
      const existingfarmer = await prisma.farmer.findFirst({
        where: {
          phoneNumber: farmerPhoneNumber,
        },
      });

      // ** if we dont get any farmer with this email
      if (!existingfarmer) {
        throw new EntityNotFoundError("Farmer not found");
      }

      // ** check if password is correct
      const correctPassword = checkPassword(
        providedPassword,
        existingfarmer.password
      );
      if (!correctPassword) {
        throw new userAutheticationError("its not your account");
      }

      // ** delete all cropcalandar and activities of this farmer with a prisma transanction
      // ** delete all posts cropcalander is exists with activity all deatils of a farmer
      // ** add a new activity data
      // ** do all things in a prisma transaction

      const response = await prisma.$transaction([
        prisma.farmer.delete({
          where: {
            id: existingfarmer.id,
          },
        }),
        prisma.deleteAccountFeedback.create({
          data: {
            farmerEmail: existingfarmer.email ?? "No email provided",
            feedback: feeedback,
            farmerPhoneNumber: existingfarmer.phoneNumber,
          },
        }),
      ]);
      return response;
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
