import fs from 'fs/promises';

export const deleteImage = async (imagePath: string) => {
  try {
    await fs.unlink(imagePath);
    console.log('image is deleted from the server');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
