import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    credentials: {
      accessKeyId: "25fd22dfd6240057b0a4c0ac5eed37ef",
      secretAccessKey:
        "007236ef5945023b5115aa9c18a812dee9954a6b59dba38af63938a6748e742c"
    },
    endpoint: "https://xqkgmbsjbovbjcxmxzrx.supabase.co/storage/v1/s3",
    region: "ap-southeast-1",
    forcePathStyle: true
    
    
  });
  