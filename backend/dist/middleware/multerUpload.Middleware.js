"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|gif/;
        const mimeType = fileType.test(file.mimetype);
        const extName = fileType.test(file.originalname.toLocaleLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed."));
    },
});
exports.uploadSingleImage = upload.single('image');
