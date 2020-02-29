const mongoose = require('mongoose');

let BookScoreSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number,
        min: 0,
        max: 10,
    },
});

// Create model
let BookScore = mongoose.model('BookScore', BookScoreSchema);

module.exports = { BookScore };
