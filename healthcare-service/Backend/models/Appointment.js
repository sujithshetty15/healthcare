const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
	docname: {
		type: String,
		required: true
	},
    username: {
        type: String,
		required: true
    },
	email: {
		type: String,
		required: true
	},
	appointmentDate: {
		type: String,
		required: true
	},
	problemtype: {
		type: String,
		required: true
	}
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;