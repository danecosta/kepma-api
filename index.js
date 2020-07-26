const express = require('express');
const routes = require('./router/route');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require("body-parser");

const app = express();

const PORT = 8057;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);