import { v2 as cloudinary } from 'cloudinary';

import { dev } from '.';

const cloudinaryService = cloudinary.config({
  cloud_name: dev.cloud.cloudinaryName,
  api_key: dev.cloud.cloudinaryAPIKey,
  api_secret: dev.cloud.cloudinaryAPISecretKey,
});

export default cloudinaryService;
