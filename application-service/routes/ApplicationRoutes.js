const express = require('express');
const db = require('../model/Application');
const router = express.Router();
const axios = require('axios');

// Apply for a job
router.post('/', (req, res) => {
  const { job_id, applicant_name, applicant_email } = req.body;
  const sql = 'INSERT INTO applications (job_id, applicant_name, applicant_email) VALUES (?, ?, ?)';
  
  db.query(sql, [job_id, applicant_name, applicant_email], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error saving application' });
    } else {
      res.status(201).json({ message: 'Application submitted', id: result.insertId });
    }
  });
});

// Get all applications
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM applications';
  
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving applications' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Route to fetch jobs from Job Service
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await axios.get('http://localhost:5000/jobs');  // Job Service URL
    res.status(200).json(jobs.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs from Job Service' });
  }
});


module.exports = router;
