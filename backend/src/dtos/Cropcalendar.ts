import { IsNotEmpty } from "class-validator";

export class CropCalanderActivities {
  @IsNotEmpty()
  activityName!: string;
  @IsNotEmpty()
  activityType!: String;
  @IsNotEmpty()
  startDate!: Date;
  @IsNotEmpty()
  endDate!: Date;
  @IsNotEmpty()
  description!: String;
}

export class CropCalendarActivityDTO {
  @IsNotEmpty()
  activityName!: string;
  @IsNotEmpty()
  activityType!: string;
  @IsNotEmpty()
  startDate!: Date;
  @IsNotEmpty()
  endDate!: Date;
  @IsNotEmpty()
  description!: string;
}
