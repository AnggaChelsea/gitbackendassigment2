const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnect = require('./config/mongoose');
const routes = require('./routes');

const app = express();
const port = 4000;

mongooseConnect();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`App runs on http://localhost:${port}`);
});


