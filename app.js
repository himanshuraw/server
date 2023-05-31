const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const Victim = require('./models/Victim');
const HelpRequest = require('./models/HelpRequest');

const app = express();
require('dotenv/config');

//* Import Routes --------------------------------------------------------------------
const adminRoute = require('./routes/admins');
const Count = require('./models/Count');

//* ----------------------------------------------------------------------------------

app.use(cors());
app.use(bodyParser.json());

//? Socket ============================================================================
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	// console.log(`User connected: ${socket.id}`);

	socket.on('send_request', async (data) => {
		let response;
		duplicate = await HelpRequest.findOne({ uniqueId: data.uniqueId });

		if (duplicate) {
			response = {
				success: true,
				message: "Please don't send multiple requests",
			};
		} else {
			const request = new HelpRequest({
				uniqueId: data.uniqueId,
				latitude: data.latitude,
				longitude: data.longitude,
			});

			try {
				const savedRequest = await request.save();
				response = {
					success: true,
					message: 'Request Send Sucessfully',
				};
			} catch (err) {
				response = {
					success: false,
					message: `Request failed`,
				};
			}
		}

		socket.emit('callback', response);

		let requests = [];
		requests = await HelpRequest.find();

		socket.broadcast.emit('recieve_request', requests);
	});
});

server.listen(process.env.PORT || 5000, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`App listening at ${port}`);
});

//* Routes ===============================================================================
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

app.get('/count', async (req, res) => {
	try {
		const count = await Count.find();
		const victim = await Victim.find();
		const saved = victim.length;
		const savedData = {
			name: 'saved',
			count: saved,
		};
		count.push(savedData);
		res.json(count);
	} catch (err) {
		res.json({
			message: err,
		});
	}
});

mongoose.connect(process.env.MONGO_URI, () =>
	console.log('~~~CONNECTED TO DB~~~')
);
