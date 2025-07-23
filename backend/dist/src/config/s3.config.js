"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({ region: process.env.AWS_REGION });
const uploadToS3 = async (fileBuffer, fileName, mimeType, acl = "public-read") => {
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileBuffer,
            ContentType: mimeType,
            ACL: acl,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        const response = await s3.send(command);
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
        return fileUrl;
    }
    catch (error) {
        console.log("error in uploading file to s3", error);
        throw new Error("failed to upload image to s3");
    }
};
exports.uploadToS3 = uploadToS3;
