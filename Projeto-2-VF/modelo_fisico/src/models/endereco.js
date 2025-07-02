const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    MUN: {
        type: String,
        required: true
    },
    DISTR: {
        type: String,
        required: true
    },
    BAIRRO: {
        type: String,
        required: true
    },
    CIDADE: {
        type: String,
        required: true
    },
    SIGLA_END_UF: {
        type: String,
        required: true,
        maxlength: 2
    },
    END_ZONA: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Endereco', enderecoSchema);