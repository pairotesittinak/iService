require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var schedule = require('node-schedule');
// var hbs = require('express-handlebars');
// var busboyBodyParser = require('busboy-body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongoose = require('mongoose'),
    _ = require('lodash');
 mongoose.connect('mongodb://localhost/my_db'); 


app.use(express.static(__dirname + "/home"));
// app.use(bodyParser.urlencoded({
// 		extended: true
// 	}));
	// app.use(bodyParser.json());
	// // app.use(validator());
	// app.use(busboyBodyParser());
// busboyBodyParser = require('busboy-body-parser'),
app.use(busboyBodyParser());

	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	// app.set('views', __dirname + '/views');
	// app.set('view engine', 'hbs');

	
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));



require('./app/pr/pr.route')(app);
require('./app/postUsers/postUsers.route')(app);
// require('./app/home/home.route')(app);

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});


// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});