const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const applicationRoutes = require('./routes/ApplicationRoutes');

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass@word1',  // Replace with your MySQL password
  database: 'applicationdb'
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
  } else {
    console.log('MySQL connected');
  }
});

// Routes for job applications
app.use('/applications', applicationRoutes);

// Route to fetch jobs from Job Service
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await axios.get('http://localhost:5000/jobs');  // Job Service URL
    res.status(200).json(jobs.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs from Job Service' });
  }
});

const PORT = 5001;  // Application service will run on port 5001
app.listen(PORT, () => console.log(`Application service running on port ${PORT}`));
