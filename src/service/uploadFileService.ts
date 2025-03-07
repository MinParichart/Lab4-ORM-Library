import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from '../awsConfig';

export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<void> {
  const params = {
    Bucket: bucket,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
