import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const productStorage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, 'public/images/products');
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const userStorage = multer.diskStorage({
  // destination: function (req: Request, file: Express.Multer.File, cb) {
  //   cb(null, 'public/images/users');
  // },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File is not image'));
  }
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Image types not allowed'));
  }
  cb(null, true);
};

export const uploadProduct = multer({ storage: productStorage });

export const uploadUser = multer({
  storage: userStorage,
  limits: { fileSize: 1024 * 1024 * 1 },
  fileFilter: fileFilter,
});
