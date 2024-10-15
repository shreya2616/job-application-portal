const mysql = require('mysql2');

const ApplicationSchema = `
  CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id VARCHAR(255) NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL
  )
`;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass@word1',  // Replace with your MySQL password
  database: 'applicationdb'
});

db.query(ApplicationSchema, (err, result) => {
  if (err) throw err;
  console.log('Applications table created or exists already.');
});

module.exports = db;
