import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  minLength,
} from "class-validator";

export class CreateFarmerDTO {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsEmail({})
  @IsNotEmpty({ message: "Email is required" })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(4, { message: "Password must be at least 4 characters long" })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "phoneNumber is Required" })
  @MinLength(10, { message: "Phone Number must be 10 characters long" })
  @MaxLength(10, { message: "Phone Number must be 10 characters long" })
  phoneNumber!: string;
}

export class FarmerResponseDTO {
  name!: string;
  email!: string | null;
  phoneNumber!: string;
  token!: string;
}

export class FarmerLoginDTO {
  @IsNotEmpty({ message: "Phone Number is Required" })
  @MinLength(10, { message: "Phone Number must be 10 characters long" })
  @MaxLength(10, { message: "Phone Number must be 10 characters long" })
  phoneNumber!: string;

  @IsNotEmpty({ message: "Password is Required" })
  password!: string;
}

export class FarmerCropCalendarCreationDTO {
  @IsNotEmpty()
  @IsString()
  cropName!: string;

  @IsNotEmpty()
  projectName!: string;

  @IsNotEmpty()
  projectDescription!: string;

  @IsNotEmpty()
  cropVariety!: string;

  @IsNotEmpty()
  cropType!: string;

  @IsNotEmpty()
  fieldSize!: GLfloat;

  @IsNotEmpty()
  seedVariety!: string;

  @IsNotEmpty()
  location!: string;

  @IsNotEmpty()
  season!: string;

  @IsNotEmpty()
  startDate!: Date;
}




export class FarmerCropCalendarActivityDTO{

  @IsNotEmpty()
  activityName!: string;

  @IsNotEmpty()
  startTime!: string;

  @IsNotEmpty()
  endTime!: string;

  @IsNotEmpty()
  description!: string;
}