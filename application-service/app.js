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
  password: 'pass@word1',  
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



const PORT = 5001;  // Application service will run on port 5001
app.listen(PORT, () => console.log(`Application service running on port ${PORT}`));
