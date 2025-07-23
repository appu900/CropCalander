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
exports.CropCalendarRequestMapper = exports.CropCalendarReqResponseDTO = exports.CropCalanderRequestDTO = void 0;
const class_validator_1 = require("class-validator");
class CropCalanderRequestDTO {
    projectName;
    projectDescription;
    cropName;
    cropType;
    fieldSize;
    location;
    season;
    startDate;
    seedVaraity;
}
exports.CropCalanderRequestDTO = CropCalanderRequestDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "projectName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "projectDescription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "cropName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "cropType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CropCalanderRequestDTO.prototype, "fieldSize", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "season", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CropCalanderRequestDTO.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CropCalanderRequestDTO.prototype, "seedVaraity", void 0);
class CropCalendarReqResponseDTO {
    id;
    farmerId;
    cropName;
    cropType;
    location;
    season;
    startDate;
    status;
    projectName;
    projectDescription;
}
exports.CropCalendarReqResponseDTO = CropCalendarReqResponseDTO;
class CropCalendarRequestMapper {
    static toDTO(data) {
        return {
            id: data.id,
            farmerId: data.farmerId,
            cropName: data.cropName,
            cropType: data.cropType,
            location: data.location,
            season: data.season,
            startDate: data.startDate,
            status: data.status,
            projectName: data.projectName ?? "",
            projectDescription: data.projectDescription ?? "",
        };
    }
    static toDTOList(models) {
        return models.map((model) => this.toDTO(model));
    }
}
exports.CropCalendarRequestMapper = CropCalendarRequestMapper;
