import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Appointment from './model.js'


let app = express();
let port = '2707';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(morgan('dev'));

// CORS cross-origin
app.use(function (req, res, next) {
 res.header(`Access-Control-Allow-Origin`, `*`);
 res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 next();
});

app.post('/', (req, res) => {
	//check that the body exists
		if (req.body){
			let apt = req.body;
			console.log ('apt : ', apt);
			//check if all the requested field of the models are received
			if (apt.name && apt.mail && apt.time){
				//get back the datas in a variable
				let newApt = new Appointment;
				newApt.lastname = apt.name;
				newApt.email = apt.mail;
				newApt.time = apt.time;
				//check if no appointment already at that time
				Appointment.findOne({'time': apt.time}, function(err, result){
					if (err) {}
					if (result){
						// if matching found, means already an appontment at that time
						//sending back a 403 error ( server has understood the request, but reject the execution)
						res.status(403).json({success:false, message:'the appointment cannot be confirmed as the date is not available'})
					}
					else{
						//if no matching, means the apt can be save in DB
						newApt.save(function(err){
							if(err){
								res.status(403).json({success:false, message:'the appointment Could not be saved in DB'})
							}
							else{
								res.status(200).json({success:true, message:'the appointment has been confirmed'})
							}	
						})
					}
				})
			}
			else{
				//j'ai bien un body, mais il manque un des champs, renvoie un 403: il manque des infos pour confirmer le RDV
				res.status(403).json({success:false, message:'please make sure you provide lastname, email and time to book appointment'})
			}
		}
		//si je n'ai pas de body
		else{
			res.status(500).json({success:false, message:'the appointment has NOT been confirmed'})
		}
})


mongoose.connect('mongodb://localhost:27017/bookingappDB', (err) => {
	if (err){throw err;}
	else{
		console.log('the data base is connected');
		app.listen(port, () => {
		console.log ('app running and listening to port' + port);
		});
	}
})
