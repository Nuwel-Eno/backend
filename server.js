const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/session', require('./routes/session'));
app.use('/api/products', require('./routes/productRoutes'));

// === Serve React Frontend in Production ===
const clientBuildPath = path.join(__dirname, '../frontend/build');


app.use(express.static(clientBuildPath));

// Serve index.html for unknown routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
