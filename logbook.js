//This program would give you the time you logged after you click the submit buttom and saved it to the time logged database
//However time uses the server time

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/employee_login.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "employee_login.htm" );//employee get request 
   console.log("employee login page has been loaded")
})

app.post('/process_post', urlencodedParser, function (req, res) {
    responses = {
        username: req.body.username,
        employee_code: req.body.employee_code
    };

   var fetchedtime = new Date().getTime(); 
   //var offset = new Date.prototype.getTimezoneOffset();
   var timeformat = function displayTime(unixtime) {
   var str = "";

   var currentTime = new Date()
   var hours = currentTime.getHours()
   var minutes = currentTime.getMinutes()
   var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
    }
    console.log(responses);
    //console.log("Time offset is: ", + offset);
    console.log(timeformat(fetchedtime));
   res.end(JSON.stringify(responses));
   //save time logged on the database
   var mongodb = require('mongodb');
   var MongoClient = mongodb.MongoClient;
   var url = 'mongodb://localhost:27017/my_logbook_db';
   MongoClient.connect(url, function (err, db) {
      if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
            console.log('Connection established to', url);

            var collection = db.collection('my_logbook_db');

            var user = {name: req.body.username, pwd: req.body.employee_code, time_logged: timeformat(fetchedtime)};

            //updating admin data
            collection.insert(([user]), function (err, result) {
            if (err) {
                console.log(err);
            } else {
              console.log("Document is successfully inserted.");
              console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
      //Close connection
            db.close();
            });
          }
        });

})

var server = app.listen(36800, function () {
	var host = server.address().address
  	var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
