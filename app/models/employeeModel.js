var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var employeeInfoSchema = mongoose.Schema({
	employee_id : {type: Number, required: true},
	first_name : {type: String, required:true, default: 'user'},
	middle_name : {type: String, required: true, default: 'user'},
	last_name : {type: String, required: true, default: 'user'},
	position : {type:String}
});

var employeeSheetSchema = mongoose.Schema({
	employee_id : {type: Number, required:true},
	employee_password : {type: Date, required: true},
	timein : {type: String}
});

var employee = mongoose.model('employee', employeeInfoSchema);
var employeeSheet = mongoose.model('employee_attendance', employeeSheetSchema);

module.exports = employee;
module.exports = employeeSheet;