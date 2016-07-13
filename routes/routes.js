var employeeController = require('./controllers/employeeController');

module.exports = {
	init: function(app){
		this.get(app);
		this.post(app);
		this.put(app);
		this.del(app);
	},
	get: function(app){
		//GET
		app.get('/', function (req, res) {
  			res.render('index', {title: 'Project X'});
		})

		app.get('/employee', function (req, res) {
   			res.render('login', {title : 'Project X- Employee'});
		});

		app.get('/employee/:username', function (req, res) {
  			 res.send(" " +req.params.username+ " profile!");
		});

		app.get('/admin', function (req, res) {
   			res.render('login', {title: 'Project X- Admin'});
		});	

	},
	post: function(app){
		app.post('/getEmployeeTimeIn', employeeController.employeeTimeIn)
		app.post('/getEmployeeTimeOut', employeeController.employeeTimeOut)
		app.post('/getEmployeeInfo', employeeController.showEmployee)
	},
	put: function(app){

	},
	del: function(app){

	}
};
