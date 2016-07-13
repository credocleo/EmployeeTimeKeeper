//modules
var http = require('http');
var fs = require('fs');
var express = require('express');
var assert = require('assert');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var eventEmitter = require('events');
var app = express();
var path = require('path');
var jade = require('jade');
var MongoClient = require('mongodb').MongoClient;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var employeeModel = require('./app/models/employeeModel');
var adminModel = require('./app/models/adminModel');

//connect to db 
var db = mongoose.connect('mongodb://localhost:27017/test');

//route config
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use(express.static('views'));
app.use(express.static('js'));

app.post('/timein',urlencodedParser,function(req,res){
    var result_sheet = {
        "employee_id" : req.body.employee_id,
        "employee_password" : req.body.employee_password
    }; 

    var emp_sheet_model = db.model('employee_attendance', employeeModel.employeeSheet);
    //var emp_sheet_model = employeeModel.employeeSheet;
    
    var employee_sheet = new emp_sheet_model();

    employee_sheet.employee_id = req.body.employee_id;
    employee_sheet.employee_password = req.body.employee_password;
    employee_sheet.timein = new Date().toISOString();
    employee_sheet.save();
    console.log(Date.now);
    console.log(new Date().toISOString());
    result = {"success": true0
    console.log(result);
    console.log(JSON.stringify(result_sheet));
    //res.end(employee_sheet.timein);
   
   res.end(JSON.stringify(result));
   //console.log(JSON.stringify(result));
   //console.log(employee_sheet);
});


app.post('/create_employee',urlencodedParser,function(req,res){
    var result = {
        "employee_id" : req.body.employee_id,
        "first_name" : req.body.first_name,
        "middle_name" : req.body.middle_name,
        "last_name" : req.body.last_name,
        "position" : req.body.position
    };

    var emp_info_model = db.model('employee', employeeModel.employee);
    var employee = new emp_info_model();

    employee.employee_id = req.body.employee_id,
    employee.first_name = req.body.first_name,
    employee.middle_name = req.body.middle_name,
    employee.last_name = req.body.last_name,
    employee.position = req.body.position
    employee.save();
    console.log('employee inserted');
    res.end('employee inserted successfully');
  
   console.log(employee);
});

app.get('/list_employee', function(req,res){
        var employee = db.model('employee',employeeModel.employee);
        employee.find(function(err,result){
            console.log(result);
            res.render('employee',{results:result});
            response = {"result":"success", "data": result};
            res.end(JSON.stringify(response));
        });
});

app.post('/create_admin',urlencodedParser,function(req,res){
    var result_admin = {
        "admin_id" : req.body.admin_id,
        "admin_password" : req.body.admin_password
    };

    var admin_info_model = db.model('admin', adminModel.admin);
    var admin = new admin_info_model();

    admin.admin_id = req.body.admin_id,
    admin.admin_password = req.body.admin_password
    admin.save();
    console.log('admin inserted');
    res.end('admin inserted successfully');
  
   console.log(admin);
});

app.get('/list_admin', function(req,res){
        var admin = db.model('admin',adminModel.admin);
        admin.find(function(err,result){
            console.log(result_admin);
            res.render('adminlist',{admins:result_admin});
            response = {"result":"success", "data": result_admin};
            res.end(JSON.stringify(response));
        });
});

//routers
app.get('/', function (req, res) {
   res.render('index', {title: 'Project X'});
})

app.get('/admin', function (req, res) {
   res.render('admin', {title: 'Project X'});
})

app.get('/utc', function (req, res) {
   res.render('utc', {title: 'Project X'});
})


/*app.get('/employee', function (req, res) {
   res.render('employee', {title : 'Project X- Employee'});
});

app.get('/employee/:username', function (req, res) {
   res.send(" " +req.params.username+ " profile!");
});

app.get('/admin', function (req, res) {
   res.render('login', {title: 'Project X- Admin'});
});

app.post('/login', function(request, response){
    var cursor = db.collection('employees').find().stream();
    cursor.on('data',function(item){
                console.log('item');
    });
   console.log('help');
}); */


//server
  var server = app.listen(8080, function (req, res) {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http:8080");
});


