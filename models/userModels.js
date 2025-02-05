const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
     
    name : {
        type : String,
        required : [true,'name is required']
    },
    email : {
        type : String,
        required : [true,'email is required']
    },
    password : {
        type : String,
        required : [true,'password is required']
    }

})

const userModel = mongoose.model('users',userShema)

 module.exports = userModel