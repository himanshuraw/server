const mongoose = require('mongoose');

const HelpRequestSchema = mongoose.Schema({
	uniqueId: {
		type: String,
		required: true,
	},
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);
