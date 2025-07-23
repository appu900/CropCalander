"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSmartIrrigationForms = exports.getDroneSparyingForms = exports.deleteFarmeraAccount = exports.createDigitalSoilHealthForm = exports.createDroneSprayingnForm = exports.createSmartIrrigationForm = exports.makeApostViaActivity = exports.addImagetoActicity = exports.makeAPost = exports.getAllCropCalendarsOfFarmer = exports.addActivityToFarmerCropCalendar = exports.createOwnCropCalendar = exports.handleAllCompletedCropcalendarRequest = exports.getAllCropCalendarRequestForFarmer = exports.updateFarmer = void 0;
exports.createFarmer = createFarmer;
exports.farmerLogin = farmerLogin;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const farmer_1 = __importDefault(require("../services/farmer"));
const application_errors_1 = require("../utils/application.errors");
const CropcalandarRequest_1 = __importDefault(require("../services/CropcalandarRequest"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const s3_config_1 = require("../config/s3.config");
const createFarmerValidaton_1 = require("../validation/createFarmerValidaton");
const farmerService = new farmer_1.default();
const cropCalendarRequestService = new CropcalandarRequest_1.default();
const storage = multer_1.default.memoryStorage(); // Store files in memory
const upload = (0, multer_1.default)({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB file size limit
// ** purpose : create a new farmer
async function createFarmer(req, res, next) {
    try {
        // ** validate the request
        const validatePayload = createFarmerValidaton_1.createFarmerSchema.parse(req.body);
        const createFarmerPayload = req.body;
        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            let optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024)
                .toBuffer();
            const fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
            createFarmerPayload.profilePic = fileUrl;
            optimizedBuffer = null;
        }
        const response = await farmerService.createFarmer(createFarmerPayload);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                message: error.message,
            });
        }
        else if (error instanceof zod_1.z.ZodError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: error.errors,
            });
        }
        next(error);
    }
}
// ** purpose : login a farmer
async function farmerLogin(req, res, next) {
    try {
        const loginPayload = req.body;
        const response = await farmerService.farmerLogin(loginPayload);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                message: error.message,
            });
        }
        next(error);
    }
}
const updateFarmer = async (req, res, next) => {
    // Ensure this returns a Promise<void>
    try {
        const farmerId = req.userId;
        // console.log(farmerId);
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return; // Exit early if unauthorized
        }
        // Initialize update payload with the existing request body
        const updatePayload = req.body;
        console.log(req.file);
        // Check if there's an uploaded file
        if (req.file) {
            // Process the image
            const optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024) // Adjust size as needed
                .toBuffer();
            // Generate a unique filename for the image
            const fileName = `${Date.now()}-${req.file.originalname}`;
            // Upload to S3 and get the file URL
            const fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
            // Add the image URL to the update payload
            console.log(fileUrl);
            updatePayload.profilePic = fileUrl;
        }
        // Update farmer details in the database
        const response = await farmerService.updateFarmer(farmerId, updatePayload);
        // Return the updated farmer information
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error); // Ensure error is passed to the error handling middleware
    }
};
exports.updateFarmer = updateFarmer;
const getAllCropCalendarRequestForFarmer = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const response = await farmerService.getALLCropCalendarOfFarmer(farmerId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCropCalendarRequestForFarmer = getAllCropCalendarRequestForFarmer;
const handleAllCompletedCropcalendarRequest = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "UnAuthorized request",
            });
            return;
        }
        const response = await cropCalendarRequestService.findCropCalendarRequestWithStatusCompleted(farmerId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handleAllCompletedCropcalendarRequest = handleAllCompletedCropcalendarRequest;
// ** purpose : create a new crop calendar for farmer
const createOwnCropCalendar = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        const payload = req.body;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const response = await farmerService.createOwnCropCalendar(payload, farmerId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createOwnCropCalendar = createOwnCropCalendar;
// ** purpose : add activity to crop calendar of farmer
const addActivityToFarmerCropCalendar = async (req, res, next) => {
    try {
        const cropCalendarId = parseInt(req.params.id);
        const payload = req.body;
        const response = await farmerService.addActivityToCropcalendar(payload, cropCalendarId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.addActivityToFarmerCropCalendar = addActivityToFarmerCropCalendar;
const getAllCropCalendarsOfFarmer = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const response = await farmerService.getALLCropCalendarOfFarmer(farmerId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCropCalendarsOfFarmer = getAllCropCalendarsOfFarmer;
// **make a  post for social media feed
const makeAPost = async (req, res, next) => {
    try {
        const userId = req.userId;
        const postContent = req.body.content;
        if (postContent.length < 10) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "the caption should be atlest 10 character",
            });
        }
        if (!userId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                error: "unauthotized attempt",
            });
            return;
        }
        let fileUrl = "";
        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            let optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024)
                .toBuffer();
            fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
        }
        const response = await farmerService.createPost(postContent, fileUrl, userId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.makeAPost = makeAPost;
const addImagetoActicity = async (req, res, next) => {
    try {
        const userID = req.userId;
        const activityID = req.body.activityID;
        if (!userID || !activityID) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "authorization required",
            });
            return;
        }
        const caption = req.body.caption;
        if (!caption) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "caption is required",
            });
            return;
        }
        let fileUrl = "";
        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            let optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024)
                .toBuffer();
            fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
        }
        const payload = {
            caption: caption,
            userID: userID,
            activityID: activityID,
            imageUrl: fileUrl,
        };
        const response = await farmerService.addImagetoActivityAutomation(payload);
        console.log(response);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "image added to activity",
            imageurl: fileUrl
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addImagetoActicity = addImagetoActicity;
const makeApostViaActivity = async (req, res, next) => {
    try {
        const content = req.body.caption;
        const activityId = parseInt(req.params.id);
        const farmerId = req.userId;
        if (!farmerId || !activityId || !content) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "invalid request",
            });
            return;
        }
        console.log(content, activityId, farmerId);
        let fileUrl = "";
        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            let optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024)
                .toBuffer();
            fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
            optimizedBuffer = null;
        }
        const response = await farmerService.updateImageToActivity(fileUrl, content, activityId, Number(farmerId));
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.makeApostViaActivity = makeApostViaActivity;
const createSmartIrrigationForm = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "Unauthorized request",
            });
            return;
        }
        const payload = req.body;
        const response = await farmerService.createSmartIrrigationFrom(Number(farmerId), payload);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createSmartIrrigationForm = createSmartIrrigationForm;
const createDroneSprayingnForm = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "Unauthorized request",
            });
            return;
        }
        const payload = req.body;
        const response = await farmerService.createDroneSprayingForm(Number(farmerId), payload);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createDroneSprayingnForm = createDroneSprayingnForm;
const createDigitalSoilHealthForm = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "Unauthorized request",
            });
            return;
        }
        const payload = req.body;
        const response = await farmerService.createSoilHealthMapForm(Number(farmerId), payload);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createDigitalSoilHealthForm = createDigitalSoilHealthForm;
const deleteFarmeraAccount = async (req, res, next) => {
    try {
        const farmerPhoneNumber = req.body.phoneNumber;
        const farmerPassword = req.body.password;
        const feedback = req.body.feedback ?? "";
        // console.log(farmerPhoneNumber, farmerPassword, feedback);
        if (!farmerPhoneNumber || !farmerPassword) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "invalid request",
            });
            return;
        }
        const response = await farmerService.deleteFarmerData(farmerPhoneNumber, farmerPassword, feedback);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            message: "account deleted successfully",
            response,
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.deleteFarmeraAccount = deleteFarmeraAccount;
const getDroneSparyingForms = async (req, res, next) => {
    try {
        const response = await farmerService.getDroneSprayingForms();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDroneSparyingForms = getDroneSparyingForms;
const getSmartIrrigationForms = async (req, res, next) => {
    try {
        const response = await farmerService.getSmartIrrigationForms();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSmartIrrigationForms = getSmartIrrigationForms;
