const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    size: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Animal', animalSchema)