import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const uploadToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  acl: ObjectCannedACL = "public-read"
) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
      ACL: acl,
    };
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    return fileUrl;
  } catch (error) {
    console.log("error in uploading file to s3", error);
    throw new Error("failed to upload image to s3");
  }
};
