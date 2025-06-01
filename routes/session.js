const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'admin-sessions',
    resource_type: 'video', // 👈 IMPORTANT for video uploads
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    public_id: (req, file) => `admin-session-${Date.now()}`
  },
});

const upload = multer({ storage });

router.post('/log', upload.single('video'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ msg: 'No video uploaded' });
  }

  res.status(200).json({
    msg: 'Video uploaded to Cloudinary successfully',
    url: req.file.path,
    public_id: req.file.filename
  });
});

module.exports = router;
