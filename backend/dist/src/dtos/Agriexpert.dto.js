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
exports.AgriExpertResponseDto = exports.AgriExpertLoginRequestDTO = exports.AgriExpertRequestDto = void 0;
const class_validator_1 = require("class-validator");
class AgriExpertRequestDto {
    name;
    email;
    password;
    phoneNumber;
    profilePic;
}
exports.AgriExpertRequestDto = AgriExpertRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgriExpertRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)({}, { message: "Invalid Email" }),
    __metadata("design:type", String)
], AgriExpertRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: "Password must be at least 4 characters long" }),
    __metadata("design:type", String)
], AgriExpertRequestDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: "Phone Number must be 10 characters long" }),
    (0, class_validator_1.MaxLength)(10, { message: "Phone Number must be 10 characters long" }),
    __metadata("design:type", String)
], AgriExpertRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgriExpertRequestDto.prototype, "profilePic", void 0);
class AgriExpertLoginRequestDTO {
    email;
    password;
}
exports.AgriExpertLoginRequestDTO = AgriExpertLoginRequestDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)({}, { message: "Invalid Email" }),
    __metadata("design:type", String)
], AgriExpertLoginRequestDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: "Password must be at least 4 characters long" }),
    __metadata("design:type", String)
], AgriExpertLoginRequestDTO.prototype, "password", void 0);
class AgriExpertResponseDto {
    id;
    name;
    token;
    profilePic;
}
exports.AgriExpertResponseDto = AgriExpertResponseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgriExpertResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgriExpertResponseDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], AgriExpertResponseDto.prototype, "profilePic", void 0);
