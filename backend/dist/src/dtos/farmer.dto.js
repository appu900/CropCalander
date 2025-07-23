"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmerDTO = exports.PostActivityDTO = exports.FarmerCropCalendarActivityDTO = exports.FarmerCropCalendarCreationDTO = exports.FarmerLoginDTO = exports.FarmerResponseDTO = exports.CreateFarmerDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateFarmerDTO {
    name;
    email;
    password;
    phoneNumber;
    address;
    profilePic;
}
exports.CreateFarmerDTO = CreateFarmerDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: "Name must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Name is required" }),
    __metadata("design:type", String)
], CreateFarmerDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFarmerDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: "Password must be at least 4 characters long" }),
    __metadata("design:type", String)
], CreateFarmerDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "phoneNumber is Required" }),
    (0, class_validator_1.MinLength)(10, { message: "Phone Number must be 10 characters long" }),
    (0, class_validator_1.MaxLength)(10, { message: "Phone Number must be 10 characters long" }),
    __metadata("design:type", String)
], CreateFarmerDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFarmerDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFarmerDTO.prototype, "profilePic", void 0);
class FarmerResponseDTO {
    name;
    email;
    phoneNumber;
    token;
    role;
    profilePic;
}
exports.FarmerResponseDTO = FarmerResponseDTO;
class FarmerLoginDTO {
    phoneNumber;
    password;
}
exports.FarmerLoginDTO = FarmerLoginDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Phone Number is Required" }),
    (0, class_validator_1.MinLength)(10, { message: "Phone Number must be 10 characters long" }),
    (0, class_validator_1.MaxLength)(10, { message: "Phone Number must be 10 characters long" }),
    __metadata("design:type", String)
], FarmerLoginDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Password is Required" }),
    __metadata("design:type", String)
], FarmerLoginDTO.prototype, "password", void 0);
class FarmerCropCalendarCreationDTO {
    cropName;
    projectName;
    projectDescription;
    cropVariety;
    cropType;
    fieldSize;
    seedVariety;
    location;
    season;
    startDate;
}
exports.FarmerCropCalendarCreationDTO = FarmerCropCalendarCreationDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "cropName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "projectName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "projectDescription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "cropVariety", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "cropType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FarmerCropCalendarCreationDTO.prototype, "fieldSize", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "seedVariety", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarCreationDTO.prototype, "season", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], FarmerCropCalendarCreationDTO.prototype, "startDate", void 0);
class FarmerCropCalendarActivityDTO {
    activityName;
    startTime;
    endTime;
    startDate;
    description;
}
exports.FarmerCropCalendarActivityDTO = FarmerCropCalendarActivityDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarActivityDTO.prototype, "activityName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarActivityDTO.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarActivityDTO.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], FarmerCropCalendarActivityDTO.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FarmerCropCalendarActivityDTO.prototype, "description", void 0);
class PostActivityDTO {
    imageUrl;
    caption;
    userID;
    activityID;
}
exports.PostActivityDTO = PostActivityDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostActivityDTO.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PostActivityDTO.prototype, "userID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PostActivityDTO.prototype, "activityID", void 0);
class UpdateFarmerDTO {
    name;
    email;
    password;
    phoneNumber;
    profilePic;
}
exports.UpdateFarmerDTO = UpdateFarmerDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: "Password must be at least 4 characters long" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: "Phone Number must be 10 characters long" }),
    (0, class_validator_1.MaxLength)(10, { message: "Phone Number must be 10 characters long" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFarmerDTO.prototype, "profilePic", void 0);
// ip adress of the server -
