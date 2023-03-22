require('dotenv').config();
const fs = require('fs');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

async function uploadFile(file) {
  if (!file) throw new Error('No file');

  const { photo } = file;
  const stream = fs.createReadStream(photo.tempFilePath);

  const input = {
    Bucket: AWS_BUCKET_NAME,
    Key: photo.name,
    Body: stream,
  };

  const command = new PutObjectCommand(input);
  return await client.send(command);
}

async function getFile(eTag) {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: 'Screenshot_20221124_103019.png',
    });

    const response = await client.send(command);

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  uploadFile,
  getFile,
};
