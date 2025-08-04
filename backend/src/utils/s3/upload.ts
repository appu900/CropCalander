import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION! || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload PDF to S3 and return the public URL
 * @param {Buffer} fileBuffer - The PDF file buffer
 * @param {string} originalName - Original filename
 * @param {string} bucketName - S3 bucket name
 * @returns {Promise<string>} - Returns the public URL of uploaded PDF
 */
export const uploadPdfToS3 = async (fileBuffer:any, originalName:any, bucketName:any) => {
  try {
    const fileName = `pdfs/${uuidv4()}-${originalName}`;
    
    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'application/pdf',
      ACL: 'public-read'
    });

    await s3Client.send(uploadCommand);
    
    // Construct the public URL
    const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${fileName}`;
    
    return publicUrl;
    
  } catch (error:any) {
    throw new Error(`PDF upload failed: ${error.message}`);
  }
};
