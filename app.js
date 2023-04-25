const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Victim = require('./models/Victim');
const HelpRequest = require('./models/HelpRequest');
require('dotenv/config');

//Import Routes

const adminRoute = require('./routes/admins');

app.use(cors());
app.use(bodyParser.json());

app.use('/admin', adminRoute);

//Find victim
app.post('/searchByAadhar', async (req, res) => {
	try {
		const victim = await Victim.findOne({ aadhar: req.body.aadhar });
		if (!victim) {
			res.status(401).send({
				message: 'Not Found',
				error: err,
			});
		}
		res.status(200).send(victim);
	} catch (err) {
		res.status(401).send({
			message: 'Not Found',
			error: err,
		});
	}
});

app.post('/searchByPhone', async (req, res) => {
	try {
		const victim = await Victim.findOne({ phone: req.body.phone });
		if (!victim) {
			res.status(401).send({
				message: 'Not Found',
				error: err,
			});
		}
		res.status(200).send(victim);
	} catch (err) {
		res.status(401).send({
			message: 'Not Found',
			error: err,
		});
	}
});

//get help request
app.post('/request', async (req, res) => {
	duplicate = await HelpRequest.findOne({ uniqueId: req.body.uniqueId });

	if (duplicate) {
		return res.status(200).send({
			success: true,
			message: "Please don't send multiple requests",
		});
	}

	const request = new HelpRequest({
		uniqueId: req.body.uniqueId,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
	});

	try {
		const savedRequest = await request.save();
		return res.status(200).send({
			success: true,
			message: 'Request Send Sucessfully',
		});
	} catch (err) {
		return res.send({
			success: false,
			message: `Request failed`,
		});
	}
});

mongoose.connect(process.env.MONGO_URI, () =>
	console.log('~~~CONNECTED TO DB~~~')
);

const listener = app.listen(5000);
console.log('Express server listening on port %d', listener.address().port);
