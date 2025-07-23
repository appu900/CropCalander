"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTO = validateDTO;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDTO(dtoClass) {
    return (req, res, next) => {
        const dtoObject = (0, class_transformer_1.plainToClass)(dtoClass, req.body);
        (0, class_validator_1.validate)(dtoObject).then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints || {})).join(', ');
                res.status(400).json({ message });
            }
            else {
                next();
            }
        });
    };
}
