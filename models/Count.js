const mongoose = require('mongoose');

const CountSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		count: {
			type: String,
		},
	},
	{
		timestamp: true,
	}
);

module.exports = mongoose.model('Count', CountSchema);
