const express = require('express');
const db = require('../model/Application');
const router = express.Router();

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

module.exports = router;
