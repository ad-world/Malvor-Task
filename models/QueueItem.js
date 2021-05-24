const mongoose = require('mongoose')

const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    time: Number,
})

const QueueItem = mongoose.model('QueueItem', ItemSchema)

module.exports = QueueItem;