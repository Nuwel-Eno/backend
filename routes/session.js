const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = `admin-session-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post('/log', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No video uploaded' });
  }

  res.status(200).json({
    msg: 'Video uploaded successfully',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
