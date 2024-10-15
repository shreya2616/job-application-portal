const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/JobRoute');

const app = express();
app.use(express.json());

// MongoDB connection
const MONGO_URI = 'mongodb://0.0.0.0:27017/jobdb';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/jobs', jobRoutes);

const PORT = 5000;  // Job service will run on port 5000
app.listen(PORT, () => console.log(`Job service running on port ${PORT}`));
