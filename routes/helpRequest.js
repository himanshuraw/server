const express = require('express');
const HelpRequest = require('../models/HelpRequest');
const Victim = require('../models/Victim');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const requests = await HelpRequest.find();
		res.json(requests);
	} catch (err) {
		res.json({
			message: err,
		});
	}
});

router.delete('/:reqId', async (req, res) => {
	try {
		const removedReq = await HelpRequest.deleteOne({
			uniqueId: req.params.reqId,
		});
		res.json(removedReq);
	} catch (err) {
		res.json({
			message: err,
		});
	}
});

module.exports = router;
