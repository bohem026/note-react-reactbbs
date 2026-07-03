const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const port = 3000;

app.use(express.json()); // json-> object
app.use(express.urlencoded({ extended: true })); //html form ->object

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
app.get('/view', (req, res) => {
  console.log(req.query.id);
  const id = req.query.id;
  // const sqlQuery = `SELECT * FROM board WHERE id=${req.query.id};`;
  const sqlQuery = "SELECT title, content, writer, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board WHERE id=?;";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/write', (req, res) => {
  console.log(req.body);
  const { name, title, content } = req.body;

  const sqlQuery = 'insert into board (writer, title, content) values (?, ?, ?);';
  db.query(sqlQuery, [name, title, content], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/delete', (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  const sqlQuery = 'DELETE FROM board WHERE id=?;';
  db.query(sqlQuery, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/deleteselect', (req, res) => {
  console.log(req.body);
  const { boardIdList } = req.body;

  const sqlQuery = `DELETE FROM board WHERE id IN (${boardIdList});`;
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/update', (req, res) => {
  console.log(req.body);
  const { name, title, content, id } = req.body;

  const sqlQuery = 'UPDATE board SET writer=?, title=?, content=? WHERE id=?;';
  db.query(sqlQuery, [name, title, content, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
