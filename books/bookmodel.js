const mongoose = require("mongoose");

mongoose.model("Book",{
    title:{
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberpage: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
})