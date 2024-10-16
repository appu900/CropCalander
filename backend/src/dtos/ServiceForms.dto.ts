import { IsNotEmpty } from "class-validator";

export class DroneSprayingFormDTO {
  @IsNotEmpty()
  farmLocation!: string;

  @IsNotEmpty()
  cropType!: string;

  @IsNotEmpty()
  areaInHectares!: GLfloat;

  @IsNotEmpty()
  sprayDate!: Date;

  @IsNotEmpty()
  query?: string;
}

export class SoilHealthMapFormDto {
  @IsNotEmpty()
  farmLocation!: string;

  @IsNotEmpty()
  soilType!: "LOAM" | "CLAY" | "SANDY" | "SILT" | "PEAT" | "CHALK";

  @IsNotEmpty()
  cropType!: string;

  @IsNotEmpty()
  areaInHectares!: GLfloat;

  @IsNotEmpty()
  query?: string;
}

export class SmartIrrigationFormDto {
  @IsNotEmpty()
  irrigationType!: "DRIP" | "SPRINKLER" | "SURFACE" | "SUBSURFACE";

  @IsNotEmpty()
  farmLocation!: string;

  @IsNotEmpty()
  cropType!: string;

  @IsNotEmpty()
  areaInHectares!: GLfloat;

  @IsNotEmpty()
  query?: string;
}
