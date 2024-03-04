const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');


router.post('/book', async (req, res) => {

    try {
        const { docname, username, email, appointmentDate, problemtype } = req.body
        console.log(req.body)
        const appt = new Appointment({
            docname, username, email, appointmentDate, problemtype
        })

        const savedAppt = await appt.save()
        return res.status(200).json({ status: 200 })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
})
router.post('/get', async (req, res) => {

    try {
        const { email } = req.body

        const appt = await Appointment.find({ email })

        return res.status(200).json(appt)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
})

module.exports = router; 