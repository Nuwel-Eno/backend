const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config for videos
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'admin_sessions',
    resource_type: 'video',
    format: async (req, file) => 'mp4',
    public_id: (req, file) => `admin-session-${Date.now()}`
  },
});

const upload = multer({ storage });

router.post('/log', upload.single('video'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ msg: 'Video upload failed' });
  }

  res.status(200).json({
    msg: 'Video uploaded successfully',
    cloudinaryUrl: req.file.path,
    public_id: req.file.filename
  });
});

module.exports = router;
