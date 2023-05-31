const express = require('express');
const Count = require('../models/Count');

const router = express.Router();

router.post('/casualty', async (req, res) => {
	let casualty = await Count.findOne({ name: 'casualty' });
	if (!casualty) {
		casualty = new Count({
			name: 'casualty',
			count: req.body.count,
		});
	} else {
		casualty.count = req.body.count;
	}
	try {
		const savedCount = await casualty.save();
		res.send({
			success: true,
			payload: savedCount,
		});
	} catch (err) {
		res.send({
			success: false,
			payload: err,
		});
	}
});

router.post('/shelter', async (req, res) => {
	let shelter = await Count.findOne({ name: 'shelter' });
	if (!shelter) {
		shelter = new Count({
			name: 'shelter',
			count: req.body.count,
		});
	} else {
		shelter.count = req.body.count;
	}
	try {
		const savedCount = await shelter.save();
		res.send({
			success: true,
			payload: savedCount,
		});
	} catch (err) {
		res.send({
			success: false,
			payload: err,
		});
	}
});

module.exports = router;
