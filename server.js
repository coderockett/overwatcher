const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const winston = require('winston');

// creating a new express app
const app = express();
const port = process.env.PORT || 3000;
// middlewares used
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API resources
require('./src/server/api/overwatch')(app);

app.listen(port, () => {
  winston.log('info', `Server listen on port... ${port}`);
});
