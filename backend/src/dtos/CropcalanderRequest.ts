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
