var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = mongoose.Schema({
	admin_id : {type: Number, required: true},
	admin_password : {type: String, required: true}
});

var admin = mongoose.model('admin', adminSchema);

module.exports = admin;