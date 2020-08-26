const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    userName : {
       type: String,
       require: true
    },
    email : {
        type: String,
        unique: true,
        require: true
    },
    password:  {
        type: String,
        minlength: 6,
        require: true
    },
    date :{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user',user,'users');
