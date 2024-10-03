import { IsNotEmpty } from "class-validator";


export class CropCalanderRequestDTO {
  @IsNotEmpty()
  cropName!: string;
  @IsNotEmpty()
  cropType!: string;
  @IsNotEmpty()
  fieldSize!: GLfloat;
  @IsNotEmpty()
  location!: string;
  @IsNotEmpty()
  season!: string;
  @IsNotEmpty()
  startDate!: Date;
}

export class CropCalendarReqResponseDTO {
  id!: number;
  farmerId!: number;
  cropName!: string;
  cropType!: string;
  location!: string;
  season!: string;
  startDate!: Date;
  status!: string;
}

export class CropCalendarRequestMapper {
  static toDTO(data:any): CropCalendarReqResponseDTO {
    return {
      id: data.id,
      farmerId: data.farmerId,
      cropName: data.cropName,
      cropType: data.cropType,
      location: data.location,
      season: data.season,
      startDate: data.startDate,
      status: data.status,
    };
  }

  static toDTOList(
    models:any[]
  ): CropCalendarReqResponseDTO[] {
    return models.map((model) => this.toDTO(model));
  }
}
