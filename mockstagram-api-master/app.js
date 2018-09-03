const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const influencers = require('./routes/influencers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/influencers', influencers);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500); //TODO: Change to RESTful error codes.
    res.json({ error: err })
}

module.exports = app;
