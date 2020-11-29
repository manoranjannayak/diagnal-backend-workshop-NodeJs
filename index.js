/**
 * This is the server file which includes creating routes, ports.
 * 
 * @since 1.0.0
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true,}));

// Import the routes
const routes = require('./routes');
app.use('/',routes);

// Define default port
let port = 3000;

// Server listen on the given port
app.listen(port, () => console.log(`Application listening on port ${port} !`));

module.exports = app