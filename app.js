const express = require('express');
const mongooseConnect = require('./config/mongoose');
const routes = require('./routes').default;

const app = express();
const port = 2000;

mongooseConnect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`App runs on http://localhost:${port}`);
});


