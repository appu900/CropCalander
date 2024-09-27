import { IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class CreateFarmerDTO {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsEmail({})
  @IsNotEmpty({ message: "Email is required" })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(4,{ message: "Password must be at least 4 characters long" })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "phoneNumber is Required" })
  @MaxLength(10, { message: "Phone Number must be 10 characters long" })
  phoneNumber!: string;
}

export class FarmerResponseDTO{
  name!: string;
  email!: string | null;
  phoneNumber!: string;
  token!: string;
}
