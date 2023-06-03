const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs'); 

const baseRoutes = require('./routes/base');

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the homeRoutes middleware for the root URL
app.use('/', baseRoutes);


app.listen(port, () => console.log(`Listening on port ${port}`));
