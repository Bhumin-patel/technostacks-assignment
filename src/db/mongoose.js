const mongoose = require('mongoose')

//mongodb://127.0.0.1:27017/task-manager-api

mongoose.connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useCreateIndex: true
})