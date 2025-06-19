const mongoose = require('mongoose');

const escolaSchema = new mongoose.Schema({
    CODESC: {
        type: Number,
        required: true,
        unique: true
    },
    CD_INEP: {
        type: Number,
        required: false
    },
    NOMEESC: {
        type: String,
        required: true
    },
    CATESC: {
        type: Number,
        required: false
    },
    TPESC: {
        type: String,
        required: false
    },
    REGIAO: {
        type: String,
        required: false
    },
    UA: {
        type: Number,
        required: false,
        ref: 'UnidadeAdministrativa'
    },
    ENDERECO_ID: {
        type: Number,
        required: false,
        ref: 'Endereco'
    }
});

module.exports = mongoose.model('Escola', escolaSchema);