const mongoose = require('mongoose');
const moment = require('moment');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    books: {
        past: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            score: {
                type: Number,
                min: 0,
                max: 10,
            },
            createdAt: {
                type: Date,
                default: moment(),
            }
        }],
        present: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            createdAt: {
                type: Date,
                default: moment(),
            }
        }]
    }
}, { timestamps: true });

// Create model
let User = mongoose.model('User', UserSchema);

module.exports = { User };
