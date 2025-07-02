const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
    CARGO_C: {
        type: Number,
        required: true,
        unique: true
    },
    NM_CARGOC: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cargo', cargoSchema);