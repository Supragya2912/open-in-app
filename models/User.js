const mongoose = require('mongoose');

const user = new mongoose.Schema(
    {
        id : {
            type : int,
            required : true
        },
        phone:{
            type: Number,
            required: true
        },
        priority:{
            type: int,
            required: true
        }   
    }
)

module.exports = mongoose.model('User', userSchema);