// db config
const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
     try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongo db connected sucessfully ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`mongo db server issue ${error} `.bgRed.white);
    }
}


module.exports = connectDB;