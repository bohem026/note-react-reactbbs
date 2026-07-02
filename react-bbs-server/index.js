const express = require('express');
var cors = require('cors');
const app = express();
const mysql = require('mysql2');
const port = 3000;

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'bbs',
});

db.connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/list', (req, res) => {
  const sqlQuery = "SELECT id, title, content, writer, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board;";

  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
