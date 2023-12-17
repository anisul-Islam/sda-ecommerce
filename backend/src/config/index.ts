// ? access all the env variables from here and export them
import 'dotenv/config';
export const dev = {
  app: {
    port: Number(process.env.PORT),
    defaultImagePath: process.env.DEFAULT_IMAGE_PATH,
    jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY,
    jwtResetPasswordKey: process.env.JWT_RESET_PASSWORD_KEY,
    jwtAccessKey: process.env.JWT_ACCESS_KEY,
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
  },
  db: {
    url: process.env.MONGODB_URL,
  },
  cloud: {
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryAPISecretKey: process.env.CLOUDINARY_API_SECRET_KEY,
  },
};
