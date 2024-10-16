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
exports.SmartIrrigationFormDto = exports.SoilHealthMapFormDto = exports.DroneSprayingFormDTO = void 0;
const class_validator_1 = require("class-validator");
class DroneSprayingFormDTO {
    farmLocation;
    cropType;
    areaInHectares;
    sprayDate;
    query;
}
exports.DroneSprayingFormDTO = DroneSprayingFormDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DroneSprayingFormDTO.prototype, "farmLocation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DroneSprayingFormDTO.prototype, "cropType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DroneSprayingFormDTO.prototype, "areaInHectares", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], DroneSprayingFormDTO.prototype, "sprayDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DroneSprayingFormDTO.prototype, "query", void 0);
class SoilHealthMapFormDto {
    farmLocation;
    soilType;
    cropType;
    areaInHectares;
    query;
}
exports.SoilHealthMapFormDto = SoilHealthMapFormDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SoilHealthMapFormDto.prototype, "farmLocation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SoilHealthMapFormDto.prototype, "soilType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SoilHealthMapFormDto.prototype, "cropType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SoilHealthMapFormDto.prototype, "areaInHectares", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SoilHealthMapFormDto.prototype, "query", void 0);
class SmartIrrigationFormDto {
    irrigationType;
    farmLocation;
    cropType;
    areaInHectares;
    query;
}
exports.SmartIrrigationFormDto = SmartIrrigationFormDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SmartIrrigationFormDto.prototype, "irrigationType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SmartIrrigationFormDto.prototype, "farmLocation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SmartIrrigationFormDto.prototype, "cropType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SmartIrrigationFormDto.prototype, "areaInHectares", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SmartIrrigationFormDto.prototype, "query", void 0);
