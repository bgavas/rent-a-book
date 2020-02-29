const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

// Create model
let User = mongoose.model('User', UserSchema);

module.exports = { User };
