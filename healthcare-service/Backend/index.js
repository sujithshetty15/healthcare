const connectTomongo = require('./db');
var cors = require('cors')
const express = require('express');
require('dotenv').config()

connectTomongo();

const port = 5000
const app = express()

app.use(cors({origin: '*'}))

app.use(cors())
app.use(express.json()) // if you want use req body , you have to use thsi

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/appointment', require('./routes/appointment'))

app.listen(port, () => {
  console.log(`iNOteBook Backend listening on port https://localhost:${port}`)
})