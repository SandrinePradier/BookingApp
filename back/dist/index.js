'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _model = require('./model.js');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = '2707';

app.use(_bodyParser2.default.json()); // for parsing application/json
app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((0, _morgan2.default)('dev'));

// CORS cross-origin
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/', function (req, res) {
	//check that the body exists
	if (req.body) {
		var apt = req.body;
		console.log('apt : ', apt);
		//check if all the requested field of the models are received
		if (apt.name && apt.mail && apt.time) {
			//get back the datas in a variable
			var newApt = new _model2.default();
			newApt.lastname = apt.name;
			newApt.email = apt.mail;
			newApt.time = apt.time;
			//check if no appointment already at that time
			_model2.default.findOne({ 'time': apt.time }, function (err, result) {
				if (err) {}
				if (result) {
					// if matching found, means already an appontment at that time
					//sending back a 403 error ( server has understood the request, but reject the execution)
					res.status(403).json({ success: false, message: 'the appointment cannot be confirmed as the date is not available' });
				} else {
					//if no matching, means the apt can be save in DB
					newApt.save(function (err) {
						if (err) {
							res.status(403).json({ success: false, message: 'the appointment Could not be saved in DB' });
						} else {
							res.status(200).json({ success: true, message: 'the appointment has been confirmed' });
						}
					});
				}
			});
		} else {
			//j'ai bien un body, mais il manque un des champs, renvoie un 403: il manque des infos pour confirmer le RDV
			res.status(403).json({ success: false, message: 'please make sure you provide lastname, email and time to book appointment' });
		}
	}
	//si je n'ai pas de body
	else {
			res.status(500).json({ success: false, message: 'the appointment has NOT been confirmed' });
		}
});

_mongoose2.default.connect('mongodb://localhost:27017/bookingappDB', function (err) {
	if (err) {
		throw err;
	} else {
		console.log('the data base is connected');
		app.listen(port, function () {
			console.log('app running and listening to port' + port);
		});
	}
});