const mongoose = require('mongoose')

const mongo = "mongodb+srv://malvor:malvor@malvor-task.dzsgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection


db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database');
});

module.exports = db;