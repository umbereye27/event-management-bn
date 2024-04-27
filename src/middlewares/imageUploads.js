const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = async (req, res, next) => {
  console.log(req.file);
  try {
    let files = req.files;
    if (!Array.isArray(files)) {
      files = [files];
    }
    if (!files || files.length === 0) {
      return next(new Error('No files provided'));
    }
    const cloudinaryUrls = [];
    for (const file of files) {
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: 800, height: 600 })
        .toBuffer();

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'COMAGENCY',
        },
        (err, result) => {
          if (err) {
            console.error('Cloudinary upload error:', err);
            return next(err);
          }
          if (!result) {
            console.error('Cloudinary upload error: Result is undefined');
            return next(new Error('Cloudinary upload result is undefined'));
          }
          cloudinaryUrls.push(result.secure_url);

          if (cloudinaryUrls.length === files.length) {
            req.body.cloudinaryUrls = cloudinaryUrls;
            next();
          }
        }
      );
      uploadStream.end(resizedBuffer);
    }
  } catch (error) {
    console.error('Error in uploadToCloudinary middleware:', error);
    next(error);
  }
};

const uploadSingleToCloudinary = async (req, res, next, folder) => {
  try {
    const file = req.file;
    if (!file) {
      return next(new Error('No file provided'));
    }

    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 800, height: 600 })
      .toBuffer();

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: `events/${folder}`,
      },
      (err, result) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return next(err);
        }
        if (!result) {
          console.error('Cloudinary upload error: Result is undefined');
          return next(new Error('Cloudinary upload result is undefined'));
        }
        req.body.cloudinaryUrl = result.secure_url;
        next();
      }
    );
    uploadStream.end(resizedBuffer);
  } catch (error) {
    console.error('Error in uploadSingleToCloudinary middleware:', error);
    next(error);
  }
};

module.exports = { upload, uploadToCloudinary, uploadSingleToCloudinary };
