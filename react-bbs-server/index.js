const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
