import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AgriExpertRequestDto {
  @IsString()
  name!: string;

  @IsString()
  @IsEmail({}, { message: "Invalid Email" })
  email!: string;

  @IsString()
  @MinLength(4, { message: "Password must be at least 4 characters long" })
  password!: string;

  @IsString()
  @MinLength(10, { message: "Phone Number must be 10 characters long" })
  @MaxLength(10, { message: "Phone Number must be 10 characters long" })
  phoneNumber!: string;
}

export class AgriExpertLoginRequestDTO{
    @IsString()
    @IsEmail({}, { message: "Invalid Email" })
    email!: string;
    
    @IsString()
    @MinLength(4, { message: "Password must be at least 4 characters long" })
    password!: string;
}

export class AgriExpertResponseDto {
  id!: number;
  @IsString()
  name!: string;
  @IsString()
  token!: string;
}
