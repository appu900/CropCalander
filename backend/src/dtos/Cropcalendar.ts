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
