const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    }
});

// Create model
let Book = mongoose.model('Book', BookSchema);

module.exports = { Book };
