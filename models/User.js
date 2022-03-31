import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6,
	},
	lastName: {
		type: String,
		trim: true,
		maxlength: 20,
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'my city',
	},
});

export default model('User', UserSchema);
