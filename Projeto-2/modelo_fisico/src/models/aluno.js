const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    CD_ALUNO_ANONIMIZADO: {
        type: String,
        required: true,
        unique: true
    },
    IDADE: {
        type: Number,
        required: true
    },
    SEXO: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    CORRACA: {
        type: String,
        required: true
    },
    NACIONAL: {
        type: String,
        required: true
    },
    MUNICIPIO_NASCIMENTO: {
        type: String,
        required: true
    },
    UF_MUN_NASC: {
        type: String,
        required: true,
        maxlength: 2
    }
});

module.exports = mongoose.model('Aluno', alunoSchema);