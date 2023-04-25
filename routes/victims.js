const express = require('express');
const Victim = require('../models/Victim');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const victims = await Victim.find();
		res.json(victims);
	} catch (err) {
		res.json({ message: err });
	}
});

//*use passport >> only admin can post here
router.post('/register', async (req, res) => {
	const victim = new Victim({
		name: req.body.name,
		age: req.body.age,
		phone: req.body.phone,
		aadhar: req.body.aadhar,
		gender: req.body.gender,
		shelter: req.body.shelter,
	});
	try {
		const savedVictim = await victim.save();
		res.json(savedVictim);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get('/:victimId', async (req, res) => {
	try {
		const victim = await Victim.findById(req.params.victimId);
		res.json(victim);
	} catch (err) {
		res.json({ message: err });
	}
});

/*
router.post("/findByAadhar", async (req, res) => {
  try {
    const victim = await Victim.findOne({ aadhar: req.body.aadhar });
    res.status(200).send(victim);
  } catch (err) {
    res.status(401).send({
      message: "Not Found",
      error: err,
    });
  }
});

router.post("/findByPhone", async (req, res) => {
  try {
    const victim = await Victim.findOne({ phone: req.body.phone });
    res.status(200).send(victim);
  } catch (err) {
    res.status(401).send({
      message: "Not Found",
      error: err,
    });
  }
});
*/

router.delete('/:victimId', async (req, res) => {
	try {
		const removedVictim = await Victim.deleteOne({ _id: req.params.victimId });
		res.json(removedVictim);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
