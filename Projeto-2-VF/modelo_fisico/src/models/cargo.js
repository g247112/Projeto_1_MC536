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

const Cargo = mongoose.model('Cargo', cargoSchema);

module.exports = Cargo;