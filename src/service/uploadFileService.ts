import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from 'crypto';
import { s3Client } from '../awsConfig';

export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
  const saltedFilename = generateSaltedFilename(file.originalname);
  const saltedFilePath = `${filePath}/${saltedFilename}`;

  const params = {
    Bucket: bucket,
    Key: saltedFilePath,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:', data);
    const publicUrl = `https://xqkgmbsjbovbjcxmxzrx.supabase.co/storage/v1/object/public/image_library/${saltedFilePath}`; 
    console.log('File uploaded successfully : ', publicUrl); 
    return publicUrl; 
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

function generateSaltedFilename(originalName: string): string {
    const salt = randomBytes(16).toString('hex');
    const extension = originalName.split('.').pop();
    return `${salt}.${extension}`;
  }
  
