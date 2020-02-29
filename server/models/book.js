const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    totalScore: {
        type: Number,
        default: 0
    },
    totalVote: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Create model
let Book = mongoose.model('Book', BookSchema);

module.exports = { Book };
