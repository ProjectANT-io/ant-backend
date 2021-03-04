import * as AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

require("dotenv").config();

// Enter copied or downloaded access ID and secret key here
const ID = process.env.S3_ID;
const SECRET = process.env.S3_SECRET;

// The name of the bucket in S3
const bucketName = process.env.BUCKET_NAME_S3 || "";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export default async function uploadToS3(file: any, filename: string) {
  // Setting up S3 upload parameters
  const params: PutObjectRequest = {
    Bucket: bucketName,
    Key: filename, // File name you want to save as in S3
    Body: file.buffer,
  };
  // Uploading files to the bucket
  const data = await s3.upload(params).promise();

  return data;
}
