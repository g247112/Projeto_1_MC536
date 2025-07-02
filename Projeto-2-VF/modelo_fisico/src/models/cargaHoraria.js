const mongoose = require('mongoose');

const cargaHorariaSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    CICLO: {
        type: String,
        required: true
    },
    MODAL: {
        type: String,
        required: true
    },
    DI: {
        type: Number,
        required: true
    },
    JORNADA: {
        type: Number,
        required: true
    },
    CODESC: {
        type: Number,
        required: true,
        ref: 'Escola'
    },
    CARGO_C: {
        type: Number,
        required: true,
        ref: 'Cargo'
    },
    CODMAE: {
        type: Number,
        required: true,
        ref: 'Disciplina'
    }
});

module.exports = mongoose.model('CargaHoraria', cargaHorariaSchema);