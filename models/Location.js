import mongoose from 'mongoose';

const LocationSchema = mongoose.Schema({
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Location', LocationSchema);
