const mongoose = require("mongoose");
const campusTiming = new mongoose.Schema({
    username: {
        type: String
    },
    date:{
        type: String
    },
    time:{
        type:[{time:String,subject:String,attended:Boolean}]
    }
});

module.exports = mongoose.model("Campus", campusTiming);