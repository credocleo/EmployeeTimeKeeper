var async = require('async');
var employeemodel = require('./app/models/employeeModel'); //employeeSchema
module.exports.controller = function(app){

employeeController.employeeTimeIn = function(req,res){

}

employeeController.employeeTimeOut = function(req,res){

}

employeeController.showEmployee =  function(req,res){
    var cursor = db.collection('employees').find().stream();
    cursor.on('data',function(item){
                console.log('item');
    });
}
}
module.exports = employeeController;

