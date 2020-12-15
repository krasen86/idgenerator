var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');

var usersController = require('./controllers/users');

var mongoURI = 'mongodb://localhost:27017/idGenerator';
var port = 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

var app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.options('*', cors());
app.use(cors());
// Import routes
app.get('/', function(req, res) {
    res.json({'message': 'Default API response for ID Generator.'});
});
app.use('/users', usersController);


// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        'message': err.message
    });
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}`);
});

module.exports = app;
