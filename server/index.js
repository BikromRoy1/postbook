const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// mysql connection
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'post_book',
});

db.connect((err) => {
  if (err) {
    console.log('something went wrong with the database connection', err);
    throw err;
  } else {
    console.log('mysql is connected');
  }
});

// gating user data for server
app.post('/getUserInfo', (req, res) => {
  const { userId, password } = req.body;

  const getUserInfoSql = `SELECT userId, userName, userImage FROM users WHERE users.userId = ?  AND users.userPassword = ?`;

  let query = db.query(getUserInfoSql, [userId, password], (err, result) => {
    if (err) {
      console.log('error getting user info', err);
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
