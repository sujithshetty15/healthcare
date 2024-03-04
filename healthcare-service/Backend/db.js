const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/heathcare";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            family: 4
        })
        console.log('Connected to Mongodb')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo