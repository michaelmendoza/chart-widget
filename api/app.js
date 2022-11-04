const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const createApp = () => {

    // Create express app
    const app = express()
    
    // Use Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    // Setup api routes
    app.use('/', require('./routes'));

    return app;
}

module.exports = {
    createApp
}