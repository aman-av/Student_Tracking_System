const mongoose = require("mongoose");
const vacationTiming = new mongoose.Schema({
    username: {
        type: String
    },
    date:{
        type: [{Date:String,checkDate:String}]
    },
    time:{
        type:[{time:String,check:String}]
    }
});

module.exports = mongoose.model("Vacation", vacationTiming);