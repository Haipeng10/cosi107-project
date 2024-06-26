const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Define a map of product categories to corresponding data
const productDataMap = {
  shoes: { title: 'Shoes', introduction: 'Explore our latest shoe collection.' },
  clothes: { title: 'Clothes', introduction: 'Discover trendy clothing styles.' },
  bags: { title: 'Bags', introduction: 'Browse our stylish bags and accessories.' }
};

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
//     console.log(sql)
//     if (err) {
//       console.error(err); 
//       res.send('Error. Please try again.'); 
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
      res.send('Error. Please try again.'); 
    } else {
      if (result.length > 0) {
        res.send('Login successful');
      } else {
        res.send('Login failed');
      }
    }
  });
});

// user input: 
// 1) test the number of properties queried: 
// ' UNION SELECT NULL -- 
// ' UNION SELECT NULL,NULL --   (correct)
// ' UNION SELECT NULL,NULL,NULL--
// 2) test the type of properties
// ' UNION SELECT 'a','test',
// 3) input: category=bags%27+union+select+username,password+from+users%20--%20
app.get('/products', (req, res) => {
  // Get the query parameter 'category'
  const category = req.query.category;
  const sql = `SELECT name,description FROM products WHERE category = '${category}'`;

  db.query(sql, [category], (err, result) => {
    console.log(sql)
    if (err) {
      console.error(err); 
      res.send('Error. Please try again.'); 
    } else {
      res.render('products', { result, category });
    }
  });
});

// parametized query
// app.get('/products', (req, res) => {
//   const category = req.query.category;
//   const sql = `SELECT name,description FROM products WHERE category = ?`;

//   db.query(sql, [category], (err, result) => {
//     if (err) {
//       console.error(err); 
//       res.send('Error. Please try again.'); 
//     } else {
//       res.render('products', { result, category });
//     }
//   });
// });

app.get('/check-session', (req, res) => {
  const cookie_id = req.cookies['cookie_id'];

  if (!cookie_id) {
      return res.redirect('/');
  }

  const sql = `SELECT * FROM sessions WHERE cookie_id = '${cookie_id}'`;
  
  db.query(sql, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Database error');
      }

      if (results.length > 0) {
          res.send('Welcome back');
      } else {
          res.redirect('/');
      }
  });
});

// app.get('/check-session', (req, res) => {
//   const cookie_id = req.cookies['cookie_id'];

//   if (!cookie_id) {
//       return res.redirect('/');
//   }

//   const sql = 'SELECT * FROM sessions WHERE cookie_id = ?';
//   db.query(sql, [cookie_id], (err, results) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send('Database error');
//       }

//       if (results.length > 0) {
//           res.send('Welcome back');
//       } else {
//           res.redirect('/');
//       }
//   });
// });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
