var http = require('http');
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var favicon =  require('serve-favicon');
var path = require('path');
var nconf = require('nconf');
var app = express();
var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(callback){

// });

//var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
	firstname : String,
	lastname : String,
	email : String,
	password : String,
	gender : String
//	birthday : { type: Date, default: Date.now};
});


var User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/user_info');

//app.use(app.router); //checks all routes before excuting static ones


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
//app.use(bodyParser());
app.use(compress());
app.use(cookieParser(nconf.get('cookie_key')));

app.set('port', nconf.get('listen_port') || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));


var cleo = new User();
	cleo.firstname = 'cleo';
	cleo.lastname = 'credo';
	cleo.email = 'cpcredo@up.edu.ph';
	cleo.password = 'pretty';
	cleo.gender = 'female';

var lala = new User({
	firstname : 'gay',
	lastname : 'sha',
	email : 'eklabu@up.edu.ph',
	password : 'shufa',
	gender : 'bayot'
});
console.log(lala.firstname);
console.log(lala.lastname);
console.log(lala.email);
console.log(lala.password);
console.log(lala.gender);
	

cleo.save(function(error) {
	if(error){
		console.log(error);
	}
})

cleo.firstname = "clarisse";
cleo.save();

console.log("user firstname"  + cleo.firstname);



/*
//configurations (port,displays)
//app.set('port', process.env.PORT || 8080);


//routing here
app.get('/', function(req,res){
	res.send("cleo is awesome!");
});

http.createServer(function(req,res){
console.log('Server running at http://127.0.0.1:8080/');
}).listen(8080, '127.0.0.1'); */

/*app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/file.txt', function (req, res) {
   res.send('Im successful!!!');
}) */

app.get('/', function (req, res) {
   res.render('index');
})

app.get('/employee', function (req, res) {
   res.render('employee');
});

app.get('/employee/:username', function (req, res) {
   res.send(" " +req.params.username+ " profile!");
   //res.render('employee');
});

app.get('/admin', function (req, res) {
   res.render('admin');
});

//app.use(express.static(path.join(__dirname, 'public')));



// var server = app.listen(8080, function () {

//   var host = server.address().address
//   var port = server.address().port

  console.log("Example app listening at http://%s", process.env.PORT)


// })


