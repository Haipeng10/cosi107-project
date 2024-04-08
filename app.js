const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});


app.get('/', (req, res) => {
  res.render('login');
});
// enter the username  sampleUser' -- 
// enter the password anything
// app.post('/login', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err); 
//       res.send('An error occurred. Please try again later.'); 
//     } else {
//       if (result.length > 0) {
//         res.send('Login successful');
//       } else {
//         res.send('Login failed');
//       }
//     }
//   });
// });

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err); 
      res.send('An error occurred. Please try again later.'); 
    } else {
      if (result.length > 0) {
        res.send('Login successful');
      } else {
        res.send('Login failed');
      }
    }
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
