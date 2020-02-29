const mongoose = require('mongoose');
const moment = require('moment');

let RentSchema = new mongoose.Schema({
    _bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        index: true,
    },
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    score: {
        type: Number,
        min: 0,
        max: 10,
    },
    borrowDate: {
        type: Date,
        default: moment(),
    },
    returnDate: {
        type: Date,
    },
}, { timestamps: true });

// Create model
let Rent = mongoose.model('Rent', RentSchema);

module.exports = { Rent };
