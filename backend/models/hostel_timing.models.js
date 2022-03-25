const mongoose = require("mongoose");
const hostelTiming = new mongoose.Schema({
    username: {
        type: String
    },
    date:{
        type: String
    },
    time:{
        type:[{time:String,check:String}]
    }
});

module.exports = mongoose.model("Hostel", hostelTiming);