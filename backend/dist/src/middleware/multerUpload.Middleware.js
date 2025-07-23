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
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    // fileFilter: (req, file, cb) => {
    //   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    //   if (allowedMimeTypes.includes(file.mimetype)) {
    //     cb(null, true);
    //   } else {
    //     cb(
    //       new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed.")
    //     );
    //   }
    // },
});
exports.uploadSingleImage = upload.single('image');
